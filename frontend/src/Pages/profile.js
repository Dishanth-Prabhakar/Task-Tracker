import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, UserRound } from 'lucide-react';
import './profile.css';

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignOut = useCallback(() => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('token');
        navigate('/');
    }, [navigate]);

    useEffect(() => {
        if (isLoggedIn) {
            const timeoutId = setTimeout(handleSignOut, 30 * 60000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoggedIn, handleSignOut]);

    // to fetch username
    // to fetch username
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/user_name`).then((response) => {
            setFname(response.data[0].fname);
        });
    }, []);


    const redirectToProfile = () => {
        navigate('/profile');
    };

    const redirectToHome = () => {
        navigate('/home');
    };

    // to fetch user details
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/profile`).then((response) => {
            setFname(response.data[0].fname);
            setLname(response.data[0].lname);
            setMail(response.data[0].mail);
            setPassword(response.data[0].password);
        });
    }, []);

    const profileupdate = () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.put(`${backendUrl}/profile_update`, {
            fname: fname,
            lname: lname,
            mail: mail,
            password: password
        }).then(() => {
            console.log("Updated Profile");
        }).catch((error) => {
            console.error("Error sending to backend:", error);
        });
        window.location.reload();
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <h1>Task Tracker</h1>
                </div>
                <div className="navbar-right">
                    <div className='user-container' onClick={redirectToProfile} >
                        <UserRound className="user-pic"/>
                        <span className="user-name">{fname}</span>
                    </div>
                    <button onClick={handleSignOut} className="logout-button"><LogOut /></button>
                </div>
            </nav>
            <button type='submit' className='back-btn' onClick={redirectToHome}>Back</button>
            <div className="sign-form-container">
            <form className='sign-form' onSubmit={profileupdate}>
                    <h2>My Profile</h2>
                    <input type="text" value={fname} placeholder='First name' onChange={(e) => setFname(e.target.value)} />
                    <input type="text" value={lname} placeholder='Last name' onChange={(e) => setLname(e.target.value)} />
                    <input type="text" value={mail} placeholder='Email' onChange={(e) => setMail(e.target.value)} disabled  />
                    <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Update</button>
            </form>
            </div>
        </>
    )
}

export default Profile
