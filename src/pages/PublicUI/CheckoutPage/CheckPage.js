import React, { useEffect, useState } from "react";
import axios from "axios";
import './Checkout.css';
import { useNavigate } from 'react-router-dom';
import SessionManager from "../../../services/SessionManager";

function CheckPage() {
    const [totalAmount, setTotalAmount] = useState(0);
    const [email, setEmail] = useState('');
    const [deliveryCode,setDeliveryCode] = useState('');
    const navigate = useNavigate();
    const session = SessionManager.getInstance();

    useEffect(() => {
        const amount = session.getTotalAmount();
        const deliveryId = session.getDeliveryId();
        if (amount) {
            setTotalAmount(amount);
        }

        // Fetch email and delivery code
        if (deliveryId) {
            const fetchEmail = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/delivery/${deliveryId}`);
                    console.log("RESPONSE: ", response.data);
                    setEmail(response.data.user.email);
                    setDeliveryCode(response.data.delivery_code);
                } catch (error) {
                    console.error('Error fetching email:', error.response ? error.response.data : error.message);
                }
            };
            fetchEmail();
        }
    }, [session]);

    const handleBack = () => {
        const isConfirmed = window.confirm("Leave the checkout process? Your cart will be cleared.");
        if (isConfirmed) {
            session.clearCart();
            navigate('/'); 
        }
    };
    const handlePayment = async () => {
        const deliveryId = session.getDeliveryId();
        if (!deliveryId) {
            alert('Delivery ID not found. Please try again.');
            return;
        }

        const paymentData = {
            delivery: { id: deliveryId },
            amount: totalAmount,
            createdAt: new Date().toISOString()
        };

        try {
            const paymentResponse = await axios.post('http://localhost:8080/payment/add', paymentData);
            if (paymentResponse.status === 201) {
                // Send email
                await axios.post('http://localhost:8080/sendPaymentEmail', {
                    email: email,
                    code: deliveryCode,
                    amount: totalAmount,
                    createdAt: paymentData.createdAt
                });

                alert('Successful payment. Email regarding the order placement will be sent to your email.');
                session.clearCart();
                window.location.href = '/';
            } else {
                alert('Failed to process payment. Please try again.');
            }
        } catch (error) {
            console.error('Error processing payment:', error.response ? error.response.data : error.message);
            alert('Failed to process payment. Please try again.');
        }
    };
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <img src={require("../../../assets/images/arrow.png")} alt="Back" className="back-arrow" onClick={handleBack} />
                <h2>Checkout</h2>
            </div>
            <div className="payment-container">
                <div className="total-cost">
                    <h5>Total Cost:</h5>
                    <h5 className="payment-amount">LKR {totalAmount}</h5>
                </div>
                <div className="payment-details-form">
                    <h5>Payment Details</h5>
                    <label>Card Number</label>
                    <input type="text" name="cardNumber" maxLength="16" placeholder="XXXX XXXX XXXX XXXX" />

                    <div className="detail-box">
                        <div className="detail-field">
                            <label>Exp Date</label>
                            <input type="text" name="expDate" maxLength="5" placeholder="MM/YY" />
                        </div>
                        <div className="detail-field">
                            <label>CVC</label>
                            <input type="text" name="cvc" maxLength="3" placeholder="XXX" />
                        </div>
                    </div>

                    <label>Card Holder's Name</label>
                    <input type="text" name="cardHolderName" placeholder="Enter Name" />
                </div>
                <button type="submit" className="confirm-button" onClick={handlePayment}>Confirm Payment</button>
            </div>
        </div>
    );
}

export default CheckPage;