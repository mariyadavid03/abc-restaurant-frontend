import React, { useState, useEffect } from 'react';
import './PagesStyle.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import QueryRespond from '../../components/OffCanvas/QueryRespond';

function ManageQuery() {
    const [queries, setQueries] = useState([]);
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedQueryId, setSelectedQueryId] = useState(null);
    const userRole = sessionStorage.getItem('role');

    useEffect(() => {
        fetchQueries();
    }, []);

    // Fetch query data
    const fetchQueries = async () => {
        try {
            const response = await axios.get('http://localhost:8080/query'); 
            const sortedQueries = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setQueries(sortedQueries);
        } catch (error) {
            console.error('Error fetching queries:', error);
        }
    };

    const handleRowClick = (queryId) => {
        setSelectedQueryId(queryId);
        setShowOffCanvas(true);
    };

    const handleCloseOffCanvas = () => {
        setShowOffCanvas(false);
        setSelectedQueryId(null);
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this query?');
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/query/remove/${id}`);
                setQueries(queries.filter(query => query.id !== id));
                fetchQueries();

                // Show success message
                setSuccessMessage('Query deleted successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
                
            } catch (error) {
                console.error('Error deleting query:', error);
                alert('An error occurred while deleting the query.');
            }
        }
    };

    // Handle success after response submission
    const handleSuccess = () => {
        setSuccessMessage('Response submitted successfully!');
        setTimeout(() => {
            setSuccessMessage('');
            fetchQueries();
        }, 3000);
    };

    return (
        <div className='page-body'>
            <div className="main-page">
                {
                    userRole === 'staff' ? (
                        <Link to="/staff/dashboard">
                            <img src={require("../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back"/>
                        </Link>
                    ) : userRole === 'admin' ? (
                        <Link to="/admin/dashboard">
                            <img src={require("../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back"/>
                        </Link>
                    ) : null
                }
                <h2>Customer Queries</h2>
                <div className='table-container'>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th>Customer Name</th>
                                <th>Email Address</th>
                                <th>Subject</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.map(query => (
                                <tr key={query.id}>
                                    <td>{query.id}</td>
                                    <td>{new Date(query.created_at).toLocaleString()}</td>
                                    <td>{query.status}</td>
                                    <td>{query.sender_name}</td>
                                    <td>{query.email}</td>
                                    <td>{query.query_subject}</td>
                                    <td>
                                        <img src={require('../../assets/images/reply.png')} onClick={() => handleRowClick(query.id)} className='reply-btn' alt='Reply' />
                                        <img src={require('../../assets/images/trash.png')} onClick={() => handleDelete(query.id)} className='trash-btn' alt='Delete' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <QueryRespond 
                show={showOffCanvas} 
                handleClose={handleCloseOffCanvas} 
                queryId={selectedQueryId}
                onSuccess={handleSuccess} 
            />
        </div>
    );
}

export default ManageQuery;