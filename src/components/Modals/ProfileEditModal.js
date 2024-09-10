import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function ProfileEditModal({ userDetails, show, handleClose, onSave }) {
  const [formValues, setFormValues] = useState({
    username: userDetails.username || '',
    name: userDetails.name || '',
    email: userDetails.email || '',
    mobileNo: userDetails.mobileNo || '',
    password: '',
  });
  const [editPassword, setEditPassword] = useState(false);


  useEffect(() => {
    setFormValues({
      username: userDetails.username,
      name: userDetails.name,
      email: userDetails.email,
      mobileNo: userDetails.mobileNo,
      password: '',
    });
  }, [userDetails]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/user/update/${userDetails.id}`, formValues);
      onSave();  
      handleClose(); 
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      alert('Failed to update profile.');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formValues.username}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNo"
                value={formValues.mobileNo}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Credentials section */}
            <Form.Check 
              type="checkbox"
              label="Edit Password"
              onChange={() => setEditPassword(!editPassword)}
            />
            {editPassword && (
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button 
          variant="primary" 
          onClick={handleSave}
          style={{ width: 'fit-content', borderRadius: '7px' }}
        >
          Save Changes
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileEditModal;
