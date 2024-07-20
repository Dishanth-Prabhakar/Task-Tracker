import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, UserRound, Plus } from 'lucide-react';
import './home.css';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming the user is logged in initially
    const [fname, setFname] = useState('');
    const navigate = useNavigate();

    const handleSignOut = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/user_name`).then((response) => {
            setFname(response.data[0].fname);
        });
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <h1>Task Tracker</h1>
                </div>
                <div className="navbar-right">
                    <div className='user-container'>
                        <UserRound className="user-pic" />
                        <span className="user-name">{fname}</span>
                    </div>
                    <button onClick={handleSignOut} className="logout-button"><LogOut /></button>
                </div>
            </nav>
            <div className="board">
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">Backlog</h3>
                    </div>
                    <div className="cards"></div>
                    <div className='add-card-container'>
                        <button className="add-card">< Plus /></button>
                    </div>
                </div>
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">To Do</h3>
                    </div>
                    <div className="cards"></div>
                    <div className='add-card-container'>
                        <button className="add-card">< Plus /></button>
                    </div>
                </div>
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">Doing</h3>
                    </div>
                    <div className="cards"></div>
                    <div className='add-card-container'>
                        <button className="add-card">< Plus /></button>
                    </div>
                </div>
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">Done</h3>
                    </div>
                    <div className="cards"></div>
                    <div className='add-card-container'>
                        <button className="add-card">< Plus /></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
