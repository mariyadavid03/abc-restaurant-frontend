import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../StaffUI/PagesStyle.css';
import OfferAddNew from '../../components/OffCanvas/OfferAddNew';
import OfferEdit from '../../components/OffCanvas/OfferEdit';


function ManageOffer() {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [offers, setOffers] = useState([]);

    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    const handleShowEdit = (item) => {
        setSelectedItem(item);
        setShowEdit(true);
    };
    const handleCloseEdit = () => setShowEdit(false);

    //Retrive offer details
    const fetchData = async() => {
        try{
            const response = await axios.get('http://localhost:8080/offer');
            setOffers(response.data);

        } catch (error){
            console.error('Error fetching data:', error);
        }
    };

    //Delete offer
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you you want to delete offer?');
        if(isConfirmed){
            try{
                await axios.delete(`http://localhost:8080/offer/remove/${id}`);
                await fetchData();
                setSuccessMessage('Itme deleted sucessfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch(error) {
                console.error('Error deleting item:', error);
                alert('An error occurred while deleting the item.');
            }
        }
    };

    const handleAddSuccess = async () => {
        await fetchData();
        setSuccessMessage('Item added succesfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleEditSuccess = async () => {
        await fetchData();
        setSuccessMessage('Item updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        handleCloseEdit();
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className='page-body'>
            <div className="main-page">
                <Link to="/admin/dashboard">
                    <img src={require("../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back" />
                </Link>
                <div className='menu-add-button-line'>
                    <h2>Manage Promotions & Offers</h2>
                    <Button onClick={handleShowAdd} className='add-btn'>
                            Add New Offer
                    </Button>
                </div>

                {successMessage && <div className="success-message">{successMessage}</div>}

                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Offer Name</th>
                                <th>Description</th>
                                <th>Rate</th>
                                <th>Valid Period</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.map(item => (
                                <tr key={item.id}>
                                    <td>{item.offer_name}</td>
                                    <td>{item.offer_desc}</td>
                                    <td>{item.discount}</td>
                                    <td>{item.valid_period}</td>
                                    <td>
                                    <img 
                                        src={require('../../assets/images/edit.png')} 
                                        onClick={() => handleShowEdit(item)} 
                                        className='edit-btn' 
                                        alt="Edit" 
                                    />
                                    <img 
                                        src={require('../../assets/images/trash.png')} 
                                        onClick={() => handleDelete(item.id)} 
                                        className='trash-btn' 
                                        alt="Delete" 
                                    />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <OfferAddNew show={showAdd} handleClose={handleCloseAdd} onSuccess={handleAddSuccess}/>
                <OfferEdit show={showEdit} handleClose={handleCloseEdit} item={selectedItem} onSuccess={handleEditSuccess} />
            </div>
        </div>
    );
}

export default ManageOffer;