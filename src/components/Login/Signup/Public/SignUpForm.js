import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  const handleEmailConfirm = async () => {
    try {
        const response = await fetch('http://localhost:8080/request-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        const data = await response.text();
        console.log('Success:', data);
        setIsOtpSent(true);
    } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
    }
};
const handleOtpVerify = async () => {
  try {
      const response = await fetch('http://localhost:8080/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp }), 
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      console.log('Success:', data);
      setIsOtpVerified(true); 
  } catch (error) {
      console.error('Fetch error:', error);
      setError('Invalid OTP');
  }
};

const handleSignup = async () => {
  try {
      const response = await fetch('http://localhost:8080/user/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password, name, mobileNo }),
      });

      if (!response.ok) {
        const errorData = await response.text(); 
        throw new Error(errorData);
      }

      const data = await response.text();
      console.log('Success:', data);
      navigate('/login'); 
  } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
  }
};

  return (
      <div>
          {!isOtpSent && (
              <div>
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                  />
                  <button onClick={handleEmailConfirm}>Confirm Email</button>
              </div>
          )}

          {isOtpSent && !isOtpVerified && (
              <div>
                  <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                  />
                  <button onClick={handleOtpVerify}>Verify OTP</button>
              </div>
          )}

          {isOtpVerified && (
              <div>
                  <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                  />
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                  />
                  <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                  />
                  <input
                      type="text"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      placeholder="Enter contact number"
                  />
                  <button onClick={handleSignup}>Signup</button>
              </div>
          )}
<br></br>
          {error && <p className="error-message">{error}</p>}
      </div>
  );
}

export default SignUpForm;