import React, {useRef} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';


function AddItemCanvas({ show, handleClose }) {
    const fileInputRef = useRef(null); 

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click(); 
    };

    const sampleImage = "https://via.placeholder.com/240x140";
    const pencilIcon = require('../../assets/images/pencil.png'); 

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add New Item</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Item Details</h5>
                <div className='item-info'>

                <div className='add-item-type'>
                    <label>Select Item Type</label>
                    <select> Select Item Type
                        <option>Appetizer</option>
                        <option>Main Dish</option>
                        <option>Dessert</option>
                        <option>Beverage</option>
                    </select>
                    </div>

                    <label>Select Item Image</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*" // Optional: Only accept image files
                        onChange={handleFileSelect}
                    />

                    
                   

                    <input type="text" placeholder="Item Name" />
                    <input type="number" placeholder="Item Price" />
                    <textarea placeholder="Item Description" />
                </div>
                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleClose}>
                    Add Item
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default AddItemCanvas;