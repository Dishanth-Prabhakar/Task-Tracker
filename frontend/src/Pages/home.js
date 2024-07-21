import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, UserRound, Plus } from 'lucide-react';
import Addbktask from '../Components/Addbktask';
import Addtodotk from '../Components/Addtodotk';
import Addtkdoing from '../Components/Addtkdoing';
import Addtkdone from '../Components/Addtkdone';
import Viewbk from '../Components/Viewbk';
import Viewtodo from '../Components/Viewtodo';
import Viewdoing from '../Components/Viewdoing';
import Viewdone from '../Components/Viewdone';
import './home.css';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [fname, setFname] = useState('');
    const [backlogdata, setbacklogdata] = useState([]);
    const [tododata, settododata] = useState([]);
    const [doingdata, setdoingdata] = useState([]);
    const [donedata, setdonedata] = useState([]);
    const [showbkcard, setbkcard] = useState(false);
    const [showtodocard, settodocard] = useState(false);
    const [showdoingcard, setdoingcard] = useState(false);
    const [showdonecard, setdonecard] = useState(false);
    const [showViewbk, setViewbk] = useState(false);
    const [showViewtodo, setViewtodo] = useState(false);
    const [showViewdoing, setViewdoing] = useState(false);
    const [showViewdone, setViewdone] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activecard, setActiveCard] = useState(null);
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


    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/user_name`).then((response) => {
            setFname(response.data[0].fname);
        });
    }, []);

    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/backtk_fetch`).then((response) => {
            console.log(response.data);
            setbacklogdata(response.data);
        })
    }, [])

    const handleViewbk = (item) => {
        setSelectedItem(item);
        setViewbk(true);
    };

    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/todotk_fetch`).then((response) => {
            console.log(response.data);
            settododata(response.data);
        })
    }, [])

    const handleViewtodo = (item) => {
        setSelectedItem(item);
        setViewtodo(true);
    };

    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/doingtk_fetch`).then((response) => {
            console.log(response.data);
            setdoingdata(response.data);
        })
    }, [])

    const handleViewdoing = (item) => {
        setSelectedItem(item);
        setViewdoing(true);
    };

    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/donetk_fetch`).then((response) => {
            console.log(response.data);
            setdonedata(response.data);
        })
    }, [])

    const handleViewdone = (item) => {
        setSelectedItem(item);
        setViewdone(true);
    };

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
                        {backlogdata.map((item, index) => (
                            <div className="card" key={index} draggable onDragStart={() => setActiveCard(index)} onDragEnd={() => setActiveCard(null)}>
                                <div className="card-title">{item.backtkname}</div>
                                <div className="card-description">Description: {item.backtkdesc}</div>
                                <div className="card-date">Created at: {item.backtkdate}</div>
                                <div className="card-footer">
                                    <div className="view-details" onClick={() => handleViewbk(item)}>View Details</div>
                                </div>
                            </div>
                        ))}
                        {showViewbk && <Viewbk item={selectedItem} onClose={() => setViewbk(false)} />}
                    </div>
                    <br />
                    <div className='add-card-container'>
                        <button className="add-card" onClick={() => setbkcard(true)}>< Plus /></button>
                        {showbkcard && <Addbktask onClose={() => setbkcard(false)} />}
                    </div>
                </div>

                {/* To Do column */}
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">To Do</h3>
                    </div>
                    <div className="cards">
                        { tododata.map((item, index) => (
                                <div className="card" key={index} draggable onDragStart={() => setActiveCard(index)} onDragEnd={() => setActiveCard(null)}>
                                    <div className="card-title">{item.todotkname}</div>
                                    <div className="card-description">Description: {item.todotkdesc}</div>
                                    <div className="card-date">Created at: {item.todotkdate}</div>
                                    <div className="card-footer">
                                    <div className="view-details" onClick={() => handleViewtodo(item)}>View Details</div>
                                </div>
                            </div>
                        ))}
                        {showViewtodo && <Viewtodo item={selectedItem} onClose={() => setViewtodo(false)} />}
                    </div>
                    <br />
                    <div className='add-card-container'>
                        <button className="add-card" onClick={() => settodocard(true)}>< Plus /></button>
                        {showtodocard && <Addtodotk onClose={() => settodocard(false)} />}
                    </div>
                </div>

                {/* Doing column */}
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">Doing</h3>
                    </div>
                    <div className="cards">
                        { doingdata.map((item, index) => (
                                <div className="card" key={index} draggable onDragStart={() => setActiveCard(index)} onDragEnd={() => setActiveCard(null)}>
                                    <div className="card-title">{item.doingtkname}</div>
                                    <div className="card-description">Description: {item.doingtkdesc}</div>
                                    <div className="card-date">Created at: {item.doingtkdate}</div>
                                    <div className="card-footer">
                                    <div className="view-details" onClick={() => handleViewdoing(item)}>View Details</div>
                                </div>
                            </div>
                        ))}
                        {showViewdoing && <Viewdoing item={selectedItem} onClose={() => setViewdoing(false)} />}
                    </div>
                    <br />
                    <div className='add-card-container'>
                        <button className="add-card" onClick={() => setdoingcard(true)}>< Plus /></button>
                        {showdoingcard && <Addtkdoing onClose={() => setdoingcard(false)} />}
                    </div>
                </div>

                {/* Done column */}
                <div className="column">
                    <div className='column-title-container'>
                        <h3 className="column-title">Done</h3>
                    </div>
                    <div className="cards">
                        { donedata.map((item, index) => (
                                <div className="card" key={index} draggable onDragStart={() => setActiveCard(index)} onDragEnd={() => setActiveCard(null)}>
                                    <div className="card-title">{item.donetkname}</div>
                                    <div className="card-description">Description: {item.donetkdesc}</div>
                                    <div className="card-date">Created at: {item.donetkdate}</div>
                                    <div className="card-footer">
                                    <div className="view-details" onClick={() => handleViewdone(item)}>View Details</div>
                                </div>
                            </div>
                        ))}
                        {showViewdone && <Viewdone item={selectedItem} onClose={() => setViewdone(false)} />}
                    </div>
                    <br />
                    <div className='add-card-container'>
                        <button className="add-card" onClick={() => setdonecard(true)}>< Plus /></button>
                        {showdonecard && <Addtkdone onClose={() => setdonecard(false)} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
