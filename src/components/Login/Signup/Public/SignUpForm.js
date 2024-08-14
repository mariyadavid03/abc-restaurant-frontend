import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './FormStyles.css';

function SignUpForm() {
  return (
    <Form>
        <div className='email-conatiner'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter a valid email address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Code (Sent via Email)</Form.Label>
                <Form.Control type="text" placeholder="Enter OTP" />
            </Form.Group>
        </div>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Text className="text-muted">
        Already have an account? 
        <a href=''>Login</a>
      </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Signup
      </Button>
    </Form>
  );
}

export default SignUpForm;