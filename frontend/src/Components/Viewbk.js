import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import './addcard.css';

function Viewbk({ item, onClose }) {
    const [id, setID] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (item) {
            setID(item.backtk_id);
            setTitle(item.backtkname);
            setDescription(item.backtkdesc);
        }
    }, [item]);

    if (!item) return null;

    const handleupbk = () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.put(`${backendUrl}/backlog_update`, {
            backtk_id: id,
            backtkname: title,
            backtkdesc: description
        }).then(() => {
            console.log("Updated backlog task");
        }).catch((error) => {
            console.error("Error sending to backend:", error);
        });
        onClose();
        window.location.reload();
    };

    return (
        <>
            <div className="modal-overlay">
                <div className='close-btn' onClick={onClose}>< X /></div>
                <div className="modal-card">
                    <form>
                        <h2>Backlog task</h2>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br />
                        <div className='view-btn'>
                            <button type="button" onClick={handleupbk} className='delete-btn'>Delete</button>
                            <button type="button" onClick={handleupbk} className='update-btn'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Viewbk;