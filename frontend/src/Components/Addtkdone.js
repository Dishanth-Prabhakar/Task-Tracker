import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import './addcard.css';

function Addtkdone({ onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // to add card to done tasks
    const handleAdd = () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.post(`${backendUrl}/done_task`, {
            donetkname: title,
            donetkdesc: description
        }).then(() => {
            console.log("Inserted done task");
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
                        <h2>Adding card to the Done list</h2>
                        <label>Title:</label>
                        <input type="text" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Description:</label>
                        <textarea value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br />
                        <button type="button" onClick={handleAdd} className='update-btn'>Add</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Addtkdone;