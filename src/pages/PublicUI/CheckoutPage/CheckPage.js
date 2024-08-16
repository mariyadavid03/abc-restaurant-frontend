import React from "react";
import './Checkout.css';

function CheckPage() {
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <img src={require("../../../assets/images/arrow.png")} alt="Back" className="back-arrow" />
                <h2>Checkout</h2>
            </div>
            <div className="payment-container">
                <div className="total-cost">
                    <h5>Total Cost:</h5>
                    <h5 className="payment-amount">LKR 3000</h5>
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
                <button type="submit" className="confirm-button">Confirm Payment</button>
            </div>
        </div>
    );
}

export default CheckPage;