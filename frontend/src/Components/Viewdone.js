import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import './addcard.css';

function Viewdone({ item, onClose }) {
    const [id, setID] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (item) {
            setID(item.done_id);
            setTitle(item.donetkname);
            setDescription(item.donetkdesc);
        }
    }, [item]);

    if (!item) return null;

    // to update done task card api call
    const handleupdone = () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.put(`${backendUrl}/done_update`, {
            done_id: id,
            donetkname: title,
            donetkdesc: description
        }).then(() => {
            console.log("Updated done task");
        }).catch((error) => {
            console.error("Error sending to backend:", error);
        });
        onClose();
        window.location.reload();
    };

    // to delete done task card api call
    const handledeletedone = () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
        axios.delete(`${backendUrl}/done_delete`, {
            data: { done_id: id }
        }).then(() => {
            console.log("delete done task");
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
                        <h2>Done task</h2>
                        <label>Title:</label>
                        <input type="text" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Description:</label>
                        <textarea value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br />
                        <div className='view-btn'>
                            <button type="button" onClick={handledeletedone} className='delete-btn'>Delete</button>
                            <button type="button" onClick={handleupdone} className='update-btn'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Viewdone;