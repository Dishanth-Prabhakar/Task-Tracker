import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './addcard.css';

function Viewdoing({ item, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (item) {
            setTitle(item.doingtkname);
            setDescription(item.doingtkdesc);
        }
    }, [item]);

    if (!item) return null;

    const handleupdoing = () => {
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
                        <h2>Doing task</h2>
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
                            <button type="button" onClick={handleupdoing} className='delete-btn'>Delete</button>
                            <button type="button" onClick={handleupdoing} className='update-btn'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Viewdoing;