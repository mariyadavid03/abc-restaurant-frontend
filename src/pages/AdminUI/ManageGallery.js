import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../StaffUI/PagesStyle.css';
import GalleryAddNew from '../../components/OffCanvas/GalleryAddNew';

function ManageGallery() {
    const [showAdd, setShowAdd] = useState(false);

    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

   
    const handleDelete = (itemId) => {
        console.log('Delete item with ID:', itemId);
    };

    return (
        <div className='page-body'>
            <div className="main-page">
                <img 
                    src={require("../../assets/images/arrow.png")} 
                    className="back-arrow" 
                    alt="Go Back" 
                    onClick={() => window.history.back()} // Navigate back on click
                />
                <div className='menu-add-button-line'>
                    <h2>Manage Gallery</h2>
                    <Button onClick={handleShowAdd} className='add-btn'>
                        Add Gallery Item
                    </Button>
                </div>

                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Title Name 1</td>
                                <td>
                                    <Button 
                                        className='delete-btn' 
                                        onClick={() => handleDelete(1)} // Pass ID for deletion
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
                <GalleryAddNew show={showAdd} handleClose={handleCloseAdd} />
                
            </div>
        </div>
    );
}

export default ManageGallery;