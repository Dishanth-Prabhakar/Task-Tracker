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
    // const [id, setID] = useState('');
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
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

    const redirectToProfile = () => {
        navigate('/profile');
    };

    // to fetch username
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/user_name`).then((response) => {
            setFname(response.data[0].fname);
        });
    }, []);

    // to fetch backlog tasks
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/backtk_fetch`).then((response) => {
            // console.log(response.data);
            setbacklogdata(response.data);
        })
    }, [])

    // to view backlog card
    const handleViewbk = (item) => {
        setSelectedItem(item);
        setViewbk(true);
    };

    // to fetch to do tasks
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/todotk_fetch`).then((response) => {
            // console.log(response.data);
            settododata(response.data);
        })
    }, [])

    // to view to do card
    const handleViewtodo = (item) => {
        setSelectedItem(item);
        setViewtodo(true);
    };

    // to fetch doing tasks
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/doingtk_fetch`).then((response) => {
            // console.log(response.data);
            setdoingdata(response.data);
        })
    }, [])

    // to view doing card
    const handleViewdoing = (item) => {
        setSelectedItem(item);
        setViewdoing(true);
    };

    // to fetch done tasks
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.get(`${backendUrl}/donetk_fetch`).then((response) => {
            // console.log(response.data);
            setdonedata(response.data);
        })
    }, [])

    // to view done card
    const handleViewdone = (item) => {
        setSelectedItem(item);
        setViewdone(true);
    };

    // to move from backlog to ToDo task
    const bkmovetodo = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("backtask id", item.backtk_id);
        axios.delete(`${backendUrl}/backlog_delete`, {
            data: { backtk_id: item.backtk_id }
        }).then(() => {
            // console.log("Deleted backlog task");
            // Then, add the task to the to do list
            axios.post(`${backendUrl}/todo_task`, {
                todotkname: item.backtkname,
                todotkdesc: item.backtkdesc
            }).then(() => {
                // console.log("Added task to To Do");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to To Do:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from backlog:", error);
        });
    };    

    // to move from backlog to doing task
    const bkmovedoing = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("backtask id", item.backtk_id);
        axios.delete(`${backendUrl}/backlog_delete`, {
            data: { backtk_id: item.backtk_id }
        }).then(() => {
            // console.log("Deleted backlog task");
            // Then, add the task to the doing list
            axios.post(`${backendUrl}/doing_task`, {
                doingtkname: item.backtkname,
                doingtkdesc: item.backtkdesc
            }).then(() => {
                // console.log("Added task to doing");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to doing:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from backlog:", error);
        });

    };

    // to move from backlog to done task
    const bkmovedone = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("backtask id", item.backtk_id);
        axios.delete(`${backendUrl}/backlog_delete`, {
            data: { backtk_id: item.backtk_id }
        }).then(() => {
            // console.log("Deleted backlog task");
            // Then, add the task to the done list
            axios.post(`${backendUrl}/done_task`, {
                donetkname: item.backtkname,
                donetkdesc: item.backtkdesc
            }).then(() => {
                // console.log("Added task to Done");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to To Do:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from backlog:", error);
        });
    };

    // to move from todo to backlog
    const todomovebk = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("todo id", item.todo_id);
        axios.delete(`${backendUrl}/todo_delete`, {
            data: { todo_id: item.todo_id }
        }).then(() => {
            // console.log("Deleted todo task");
            // Then, add the task to the backlog list
            axios.post(`${backendUrl}/backlog_task`, {
                backtkname: item.todotkname,
                backtkdesc: item.todotkdesc
            }).then(() => {
                // console.log("Added task to backlog");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to backlog:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from todo:", error);
        });
    };

    // to move from todo to doing
    const todomovedoing = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("todo id", item.todo_id);
        axios.delete(`${backendUrl}/todo_delete`, {
            data: { todo_id: item.todo_id }
        }).then(() => {
            // console.log("Deleted todo task");
            // Then, add the task to the doing list
            axios.post(`${backendUrl}/doing_task`, {
                doingtkname: item.todotkname,
                doingtkdesc: item.todotkdesc
            }).then(() => {
                // console.log("Added task to doing");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to Doing:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from todo:", error);
        });
    };

    // to move from todo to done
    const todomovedone = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("todo id", item.todo_id);
        axios.delete(`${backendUrl}/todo_delete`, {
            data: { todo_id: item.todo_id }
        }).then(() => {
            // console.log("Deleted todo task");
            // Then, add the task to the done list
            axios.post(`${backendUrl}/done_task`, {
                donetkname: item.todotkname,
                donetkdesc: item.todotkdesc
            }).then(() => {
                // console.log("Added task to Done");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to Done:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from todo:", error);
        });
    };

    // to move from doing to backlog
    const doingmovebk = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("doing id", item.doing_id);
        axios.delete(`${backendUrl}/doing_delete`, {
            data: { doing_id: item.doing_id }
        }).then(() => {
            // console.log("Deleted doing task");
            // Then, add the task to the backlog list
            axios.post(`${backendUrl}/backlog_task`, {
                backtkname: item.doingtkname,
                backtkdesc: item.doingtkdesc
            }).then(() => {
                // console.log("Added task to backlog");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to backlog:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from doing:", error);
        });
    };

    // to move from doing to todo
    const doingmovetodo = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("doing id", item.doing_id);
        axios.delete(`${backendUrl}/doing_delete`, {
            data: { doing_id: item.doing_id }
        }).then(() => {
            // console.log("Deleted doing task");
            // Then, add the task to the todo list
            axios.post(`${backendUrl}/todo_task`, {
                todotkname: item.doingtkname,
                todotkdesc: item.doingtkdesc
            }).then(() => {
                // console.log("Added task to todo");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to todo:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from doing:", error);
        });
    };

    // to move from doing to done
    const doingmovedone = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("doing id", item.doing_id);
        axios.delete(`${backendUrl}/doing_delete`, {
            data: { doing_id: item.doing_id }
        }).then(() => {
            // console.log("Deleted doing task");
            // Then, add the task to the done list
            axios.post(`${backendUrl}/done_task`, {
                donetkname: item.doingtkname,
                donetkdesc: item.doingtkdesc
            }).then(() => {
                // console.log("Added task to done");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to done:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from doing:", error);
        });
    };

    // to move from done to backlog
    const donemovebk = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("done id", item.done_id);
        axios.delete(`${backendUrl}/done_delete`, {
            data: { done_id: item.done_id }
        }).then(() => {
            // console.log("Deleted done task");
            // Then, add the task to the backlog list
            axios.post(`${backendUrl}/backlog_task`, {
                backtkname: item.donetkname,
                backtkdesc: item.donetkdesc
            }).then(() => {
                // console.log("Added task to backlog");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to backlog:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from done:", error);
        });
    };

    // to move from done to todo
    const donemovetodo = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("done id", item.done_id);
        axios.delete(`${backendUrl}/done_delete`, {
            data: { done_id: item.done_id }
        }).then(() => {
            // console.log("Deleted done task");
            // Then, add the task to the todo list
            axios.post(`${backendUrl}/todo_task`, {
                todotkname: item.donetkname,
                todotkdesc: item.donetkdesc
            }).then(() => {
                // console.log("Added task to todo");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to todo:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from done:", error);
        });
    };

    // to move from done to doing
    const donemovedoing = (item) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        // console.log("done id", item.done_id);
        axios.delete(`${backendUrl}/done_delete`, {
            data: { done_id: item.done_id }
        }).then(() => {
            // console.log("Deleted done task");
            // Then, add the task to the doing list
            axios.post(`${backendUrl}/doing_task`, {
                doingtkname: item.donetkname,
                doingtkdesc: item.donetkdesc
            }).then(() => {
                // console.log("Added task to doing");
                window.location.reload(); // Refresh the page
            }).catch((error) => {
                console.error("Error adding to Doing:", error);
            });
        }).catch((error) => {
            console.error("Error deleting from done:", error);
        });
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <h1>Task Tracker</h1>
                </div>
                <div className="navbar-right">
                    <div className='user-container' onClick={redirectToProfile}>
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
                                <div className="drop-down-container">
                                    <div className="dropdown">
                                        <button className="dropdown-button">Move to</button>
                                        <div className="dropdown-content">
                                            <button onClick={() => bkmovetodo(item)}>To Do</button>
                                            <button onClick={() => bkmovedoing(item)}>Doing</button>
                                            <button onClick={() => bkmovedone(item)}>Done</button>
                                        </div>
                                    </div>
                                </div>
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
                        {tododata.map((item, index) => (
                            <div className="card" key={index} draggable onDragStart={() => setActiveCard(index)} onDragEnd={() => setActiveCard(null)}>
                                <div className="drop-down-container">
                                    <div className="dropdown">
                                        <button className="dropdown-button">Move to</button>
                                        <div className="dropdown-content">
                                            <button onClick={() => todomovebk(item)}>Backlog</button>
                                            <button onClick={() => todomovedoing(item)}>Doing</button>
                                            <button onClick={() => todomovedone(item)}>Done</button>
                                        </div>
                                    </div>
                                </div>
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
                        {doingdata.map((item, index) => (
                            <div className="card" key={index} draggable onDragStart={() => setActiveCard(index)} onDragEnd={() => setActiveCard(null)}>
                                <div className="drop-down-container">
                                    <div className="dropdown">
                                        <button className="dropdown-button">Move to</button>
                                        <div className="dropdown-content">
                                            <button onClick={() => doingmovebk(item)}>Backlog</button>
                                            <button onClick={() => doingmovetodo(item)}>To Do</button>
                                            <button onClick={() => doingmovedone(item)}>Done</button>
                                        </div>
                                    </div>
                                </div>
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
                        {donedata.map((item, index) => (
                            <div className="card" key={index} draggable onDragStart={() => setActiveCard(index)} onDragEnd={() => setActiveCard(null)}>
                                <div className="drop-down-container">
                                    <div className="dropdown">
                                        <button className="dropdown-button">Move to</button>
                                        <div className="dropdown-content">
                                            <button onClick={() => donemovebk(item)}>Backlog</button>
                                            <button onClick={() => donemovetodo(item)}>To Do</button>
                                            <button onClick={() => donemovedoing(item)}>Doing</button>
                                        </div>
                                    </div>
                                </div>
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
