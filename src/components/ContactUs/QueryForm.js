import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './QueryForm.css'

function QueryForm() {
  return (
    <Form className='query-form'>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter yout name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSubject">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="Enter the subject of your message" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter your message" required />
      </Form.Group>

      <Button variant="primary" type="submit" className='submit-btn'>
        Submit
      </Button>
    </Form>
  );
}

export default QueryForm;