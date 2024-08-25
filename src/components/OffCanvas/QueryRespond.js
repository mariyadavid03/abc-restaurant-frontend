import React, { useEffect, useState } from 'react';
import './CanvasStyle.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

function QueryRespond({ show, handleClose, queryId, onSuccess }) {
    const [queryDetails, setQueryDetails] = useState({
        email: '',
        query_subject: '',
        query_message: '',
        staff_name: '',
        response_message: '',
        status: ''
    });

    useEffect(() => {
        if (queryId) {
            fetchQueryDetails(queryId);
            setQueryDetails(prevDetails => ({
                ...prevDetails,
                staff_name: '',
                response_message: ''
            }));
            fetchResponseDetails(queryId);
        }
    }, [queryId]);

    const fetchQueryDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/query/${id}`);
            const queryData = response.data;
            setQueryDetails(prevDetails => ({
                ...prevDetails,
                email: queryData.email,
                query_subject: queryData.query_subject,
                query_message: queryData.query_message,
                status: queryData.status
            }));
        } catch (error) {
            console.error('Error fetching query details:', error);
        }
    };

    const fetchResponseDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/response/query/${id}`);
            const responseData = response.data;
            setQueryDetails(prevDetails => ({
                ...prevDetails,
                response_message: responseData ? responseData.response_message : '',
                staff_name: responseData && responseData.user ? responseData.user.name : ''
            }));
        } catch (error) {
            console.error('Error fetching response details:', error);
        }
    };

    const handleResponseChange = (event) => {
        setQueryDetails(prevDetails => ({
            ...prevDetails,
            response_message: event.target.value
        }));
    };

    const handleSubmitResponse = async () => {
        try {
            // Submit response
            await axios.post('http://localhost:8080/response/add', {
                query: { id: queryId },
                user: { id: 2 },
                response_message: queryDetails.response_message
            });
    
            // Update query status
            await axios.put(`http://localhost:8080/query/updateStatus/${queryId}`, {
                status: 'Resolved'  
            });
    
            // Trigger email sending
            await axios.post('http://localhost:8080/query-response', {
                email: queryDetails.email,  
                staff_name: queryDetails.staff_name, 
                response: queryDetails.response_message
            });
    
            console.log('Response added, query status updated, and email sent.');
            onSuccess();  
            handleClose();
        } catch (error) {
            console.error('Error submitting response:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Query Info</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="item-info">
                    <h5>Query Subject</h5>
                    <input type="text" value={queryDetails.query_subject} disabled />
                </div>
                <div className="item-info">
                    <h5>Query Message</h5>
                    <textarea value={queryDetails.query_message} disabled />
                </div>
                <div className="item-info">
                    <h5>Query Response</h5>
                    <textarea 
                        value={queryDetails.response_message || ''} 
                        placeholder="Enter Response" 
                        disabled={queryDetails.status === 'Resolved'}
                        onChange={handleResponseChange}
                    />
                </div>
                {queryDetails.status !== 'Resolved' && (
                    <Button 
                        className='submit-btn' 
                        style={{ marginTop: '10px' }}
                        onClick={handleSubmitResponse}
                    >
                        Submit Response
                    </Button>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default QueryRespond;