import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, UserRound, Plus } from 'lucide-react';
import './home.css';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming the user is logged in initially
    const [fname, setFname] = useState('');
    const [backlogdata, setbacklogdata] = useState([]);
    const [tododata, settododata] = useState([]);
    const [doingdata, setdoingdata] = useState([]);
    const [donedata, setdonedata] = useState([]);
    const navigate = useNavigate();

    const handleSignOut = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('token');
        navigate('/');
    };

    {/* to fetch user name */}
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/user_name`).then((response) => {
            setFname(response.data[0].fname);
        });
    }, []);

    {/* to fetch backlog tasks */}
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/backtk_fetch`).then((response) => {
            // console.log(response.data);
            setbacklogdata(response.data);
        })
    }, [])

    {/* to fetch to do tasks */}
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/todotk_fetch`).then((response) => {
            // console.log(response.data);
            settododata(response.data);
        })
    }, [])

    {/* to fetch doing tasks */}
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/doingtk_fetch`).then((response) => {
            // console.log(response.data);
            setdoingdata(response.data);
        })
    }, [])

    {/* to fetch done tasks */}
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/donetk_fetch`).then((response) => {
            // console.log(response.data);
            setdonedata(response.data);
        })
    }, [])

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

            {/* backlog column */}
            <div className="board">
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">Backlog</h3>
                    </div>
                    <div className="cards">
                        {
                            backlogdata.map(item => (
                                <div className="row row-display">
                                    <div> Title: {item.backtkname}</div>
                                    <div> description: {item.backtkdesc} </div>
                                    <div> craeted:  {item.backtkdate} </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='add-card-container'>
                        <button className="add-card">< Plus /></button>
                    </div>
                </div>

                {/* To Do column */}
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">To Do</h3>
                    </div>
                    <div className="cards">
                        {
                            tododata.map(item => (
                                <div className="row row-display">
                                    <div> Title: {item.todotkname}</div>
                                    <div> description: {item.todotkdesc} </div>
                                    <div> craeted:  {item.todotkdate} </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='add-card-container'>
                        <button className="add-card">< Plus /></button>
                    </div>
                </div>

                {/* Doing column */}
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">Doing</h3>
                    </div>
                    <div className="cards">
                        {
                            doingdata.map(item => (
                                <div className="row row-display">
                                    <div> Title: {item.doingtkname}</div>
                                    <div> description: {item.doingtkdesc} </div>
                                    <div> craeted:  {item.doingtkdate} </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='add-card-container'>
                        <button className="add-card">< Plus /></button>
                    </div>
                </div>

                {/* Done column */}
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">Done</h3>
                    </div>
                    <div className="cards">
                        {
                            donedata.map(item => (
                                <div className="row row-display">
                                    <div> Title: {item.donetkname}</div>
                                    <div> description: {item.donetkdesc} </div>
                                    <div> craeted:  {item.donetkdate} </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='add-card-container'>
                        <button className="add-card">< Plus /></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
