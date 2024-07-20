import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, UserRound, Plus } from 'lucide-react';
import './home.css';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming the user is logged in initially
    const navigate = useNavigate();

    const handleSignOut = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        if (isLoggedIn) {
            const timeoutId = setTimeout(handleSignOut, 30 * 60000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoggedIn]);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <h1>Task Tracker</h1>
                </div>
                <div className="navbar-right">
                    <span className='user_details'>
                        <UserRound /></span>
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