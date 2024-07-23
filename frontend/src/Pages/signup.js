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
    const [fnamestatus, setFnameStatus] = useState("");
    const [lnamestatus, setLnameStatus] = useState("");
    const [mailstatus, setMailStatus] = useState("");
    const [passStatus, setPassStatus] = useState("");
    const [cpassStatus, setCpassStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            const timeoutId = setTimeout(handleSignOut, 30 * 60000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoggedIn]);

    // Manual signup process
    const handlesignup = (e) => {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const namePattern = /^[A-Za-z]+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        setFnameStatus("");
        setLnameStatus("");
        setMailStatus("");
        setPassStatus("");
        setCpassStatus("");
        setStatus("");

        if (fname === "" || lname === "" || mail === "" || password === "" || cpassword === "") {
            setStatus("All fields are mandatory to fill");
            return;
        }

        if (!namePattern.test(fname)) {
            setFnameStatus("First name should contain only alphabets.");
            return;
        }

        if (!namePattern.test(lname)) {
            setLnameStatus("last name should contain only alphabets.");
            return;
        }

        if (!emailPattern.test(mail)) {
            setMailStatus("Please enter a valid email.");
            return;
        }

        if (!passwordPattern.test(password)) {
            setPassStatus("Password must be 8 characters long, should contain atleast one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        if (password !== cpassword) {
            setCpassStatus("Both passwords do not match.");
            return;
        }

        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.post(`${backendUrl}/google_signup`, {
            mail: mail
        }).then((response) => {
            console.log(response);
            if (response.data === "present") {
                setStatus("Account already exists > Login!");
            } else {
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
        });
    }

    // Google signup process
    const handleLoginSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        setIsLoggedIn(true);
        const userfname = decoded.given_name;
        const userlname = decoded.family_name;
        const userEmail = decoded.email;
        setFname(userfname);
        setLname(userlname);
        setMail(userEmail);
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.post(`${backendUrl}/google_signup`, {
            mail: userEmail
        }).then((response) => {
            console.log(response);
            if (response.data === "present") {
                setStatus("Account already exists > Login!");
            } else {
                setFname(userfname);
                setLname(userlname);
                setMail(userEmail);
                sendtobackend(userEmail);
            }
        }).catch((error) => {
            console.error("Error logging in:", error);
        });
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
                    <div className="input-group">
                        <input type="text" value={fname} placeholder='First name' onChange={(e) => setFname(e.target.value)} />
                        {fnamestatus && <span style={{ color: 'red' }}>{fnamestatus}</span>}
                    </div>
                    <div className="input-group">
                        <input type="text" value={lname} placeholder='Last name' onChange={(e) => setLname(e.target.value)} />
                        {lnamestatus && <span style={{ color: 'red' }}>{lnamestatus}</span>}
                    </div>
                    <div className="input-group">
                        <input type="text" value={mail} placeholder='Email' onChange={(e) => setMail(e.target.value)} />
                        {mailstatus && <span style={{ color: 'red' }}>{mailstatus}</span>}
                    </div>
                    <div className="input-group">
                        <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        {passStatus && <span style={{ color: 'red' }}>{passStatus}</span>}
                    </div>
                    <div className="input-group">
                        <input type="password" value={cpassword} placeholder='Confirm password' onChange={(e) => setCPassword(e.target.value)} />
                        {cpassStatus && <span style={{ color: 'red' }}>{cpassStatus}</span>}
                    </div>
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