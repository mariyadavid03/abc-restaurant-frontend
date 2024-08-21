import React, { useState } from 'react';
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        console.log('Success:', data);
        setIsOtpSent(true);
    } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to send OTP');
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
      const response = await fetch('http://localhost:8080/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password, name, mobileNo }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      console.log('Success:', data);
      navigate('/'); 
  } catch (error) {
      console.error('Fetch error:', error);
      setError('Signup failed');
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

          {error && <p className="error-message">{error}</p>}
      </div>
  );
}

export default SignUpForm;