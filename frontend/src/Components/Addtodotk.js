import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import './addcard.css';

function Addtodotk({ onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.post(`${backendUrl}/todo_task`, {
            todotkname: title,
            todotkdesc: description
        }).then(() => {
            console.log("Inserted to do task");
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
                        <h2>Adding card to the To Do list</h2>
                        <label>Title:</label>
                        <input type="text" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Description:</label>
                        <textarea value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br />
                        <button type="button" onClick={handleAdd}>Add</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Addtodotk;