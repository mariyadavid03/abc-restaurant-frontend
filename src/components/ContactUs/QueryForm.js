import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './QueryForm.css';

function QueryForm() {
    const [formData, setFormData] = useState({
        sender_name: '',
        email: '',
        query_subject: '',
        query_message: '',
    });
  
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //Add query
        axios.post('http://localhost:8080/query/add', {
            sender_name: formData.sender_name,
            email: formData.email,
            query_subject: formData.query_subject,
            query_message: formData.query_message,
        })
        .then(response => {
            alert('Your query has been submitted successfully! A reply will be sent to your email.');
            setErrorMessage('');
            setResponseMessage('');
            setFormData({ sender_name: '', email: '', query_subject: '', query_message: '' });
        })
        .catch(error => {
            alert('There was an error submitting your query.');
            setResponseMessage('');
            setErrorMessage('');
        });
    };

    return (
        <div className="query-form-container">
            <Form className='query-form' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your name" 
                        name="sender_name"
                        value={formData.sender_name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter the subject of your message" 
                        name="query_subject"
                        value={formData.query_subject}
                        onChange={handleChange}
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Enter your message" 
                        name="query_message"
                        value={formData.query_message}
                        onChange={handleChange}
                        required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className='submit-btn'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default QueryForm;