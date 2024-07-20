import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import "./signup.css"

function Signup() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            const timeoutId = setTimeout(handleSignOut, 30 * 60000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoggedIn]);

    const handlesignup = (e) => {
        e.preventDefault();
        if (fname === "" || lname === "" || mail === "" || password === "" || cpassword === "") {
            setStatus("All fields are mandatory fields");
            return;
        }
        else {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
            axios.post(`${backendUrl}/user_signup`, {
                fname: fname,
                lname: lname,
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

    const handleLoginSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        setIsLoggedIn(true);
        const userfname = decoded.given_name;
        const userlname = decoded.family_name;
        const userEmail = decoded.email;
        setFname(userfname);
        setLname(userlname);
        setMail(userEmail);
        sendtobackend(userEmail);
        sessionStorage.setItem('token', credentialResponse.credential);
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        // setUserEmail('');
        // setUserName('');
        sessionStorage.removeItem('token');
    };

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

    return (
        <>
            <div className="signup-page">
                <h1 style={{ textAlign: "center" }}>Task Tracker</h1>
                <form className='sign-form' onSubmit={handlesignup}>
                    <h2>SignUp</h2>
                    <div>
                        <span style={{ color: 'red' }}>
                            <h5>{status}</h5>
                        </span>
                    </div>
                    <input type="text" value={fname} placeholder='First name' onChange={(e) => setFname(e.target.value)} />
                    <input type="text" value={lname} placeholder='Last name' onChange={(e) => setLname(e.target.value)} />
                    <input type="text" value={mail} placeholder='Email' onChange={(e) => setMail(e.target.value)} />
                    <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" value={cpassword} placeholder='Confirm password' onChange={(e) => setCPassword(e.target.value)} />
                    <button type="submit">SignUp</button>

                    <p className='or-text'>Or Signup with</p>

                    <div className="google-login">
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                onError={handleLoginError}
                            />
                        </GoogleOAuthProvider>

                    </div>

                    <p>Already have an account?
                        <Link className="pg-link" aria-current="page" to="/"> Login!</Link>
                    </p>


                </form>
            </div>
        </>
    );
}

export default Signup;