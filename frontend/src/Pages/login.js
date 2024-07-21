import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Updated import for jwtDecode
import "./login.css";

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            const timeoutId = setTimeout(handleSignOut, 30 * 60000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoggedIn]);

    // Manual login 
    const handleLogin = (e) => {
        e.preventDefault();
        if (mail === "" || password === "") {
            setStatus("Email and password are mandatory fields");
            return;
        }
        else {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
            axios.post(`${backendUrl}/user_login`, {
                mail: mail,
                password: password
            }).then((response) => {
                if (response.data === "wrong") {
                    setStatus("Invalid email or password");
                } else {
                    setStatus("Welcome");
                    setIsLoggedIn(true);
                    sessionStorage.setItem('token', response.data.token);
                    console.log("mail", mail);
                    sendtobackend(mail);
                    navigate('/home');
                }
            }).catch((error) => {
                console.error("Error logging in:", error);
            });
        }
    };

    // Google login
    const handleLoginSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        const userEmail = decoded.email;
        setIsLoggedIn(true);
        setMail(userEmail);
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.post(`${backendUrl}/google_login`, {
            mail: userEmail
        }).then((response) => {
            console.log(response);
            if (response.data === "wrong") {
                setStatus("Don't have an account > SignUp!");
            } else {
                setStatus("Welcome");
                setIsLoggedIn(true);
                sessionStorage.setItem('token', response.data.token);
                sendtobackend(userEmail);
                navigate('/home');
            }
        }).catch((error) => {
            console.error("Error logging in:", error);
        });
    };

    // api call to send mail id to backend
    const sendtobackend = (mailid) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.post(`${backendUrl}/logindetails`, {
            Mail: mailid
        }).then(() => {
            console.log("Mail sent to backend");
        }).catch((error) => {
            console.error("Error sending mail to backend:", error);
        });
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        setMail('');
        sessionStorage.removeItem('token');
    };

    return (
        <div className="login-page">
            <h1 style={{ textAlign: "center" }}>Task Tracker</h1>
            <form className='form' onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    <span style={{ color: 'red' }}>
                        <h5>{status}</h5>
                    </span>
                </div>
                <input type="text" placeholder='Email' value={mail} onChange={(e) => setMail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <p className='or-text'>Or login with</p>
                <div className="google-login">
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginError}
                        />
                    </GoogleOAuthProvider>
                </div>
                <p>Don't have an account?
                    <Link className="pg-link" aria-current="page" to="/SignUp"> SignUp!</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;