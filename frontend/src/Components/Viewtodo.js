import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './addcard.css';

function Viewtodo({ item, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (item) {
            setTitle(item.todotkname);
            setDescription(item.todotkdesc);
        }
    }, [item]);

    if (!item) return null;

    const handleuptodo = () => {
        console.log('Title:', title);
        console.log('Description:', description);
        onClose();
    };

    return (
        <>
            <div className="modal-overlay">
                <div className='close-btn' onClick={onClose}>< X /></div>
                <div className="modal-card">
                    <form>
                        <h2>To Do task</h2>
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
                            <button type="button" onClick={handleuptodo} className='delete-btn'>Delete</button>
                            <button type="button" onClick={handleuptodo} className='update-btn'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Viewtodo;