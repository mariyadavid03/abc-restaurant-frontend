import React, { useRef, useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';
import axios from 'axios';

function ServiceEdit({show, handleClose, item, onSuccess}){
    const fileInputRef = useRef(null); 
    const [selectedImage, setSelectedImage] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [serviceDesc, setServiceDesc] = useState('');

    useEffect(() => {
        if (item) {
            setServiceName(item.service_name || '');
            setServiceDesc(item.service_desc || '');
            if (item.id) {
                loadImage(item.id);
            }
        }
    }, [item]);

    const loadImage = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/service/image/${id}`, {
                responseType: 'arraybuffer'
            });
            const base64Image = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            );
            setSelectedImage(`data:image/jpeg;base64,${base64Image}`);
        } catch (error) {
            console.error('Error loading image:', error);
            setSelectedImage('');  
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameChange = (e) => setServiceName(e.target.value);
    const handleDescChange = (e) => setServiceDesc(e.target.value);
    const handleSaveChanges = async () => {
        const data = new FormData();
        data.append('serviceName', serviceName);
        data.append('serviceDesc', serviceDesc);
        if (fileInputRef.current.files[0]) {
            data.append('image', fileInputRef.current.files[0]);
        }

        try {
            await axios.put(`http://localhost:8080/service/update/${item.id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onSuccess();
            handleClose();
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Facility</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='item-info'>
                    <div className='image-box'>
                        {selectedImage ? (
                            <img src={selectedImage} alt="Item" style={{ width: '100%', height: 'auto' }} />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*" 
                        onChange={handleFileSelect}
                    />

                    <label>Facility Title</label>
                    <input type="text" value={serviceName} onChange={handleNameChange} placeholder="Facility Title" />
                    
                    <label>Facility Description</label>
                    <textarea value={serviceDesc} onChange={handleDescChange} placeholder="Facility Description" />
                </div>
                
                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );

}

export default ServiceEdit;