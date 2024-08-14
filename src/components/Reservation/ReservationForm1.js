import React from "react";
import './ReservationFormStyle.css';

function ReservationForm1() {
    return (
        <form className="reservation-form">
            <h2>Booking Details</h2>
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" required />
            </div>
            <div className="form-group">
                <label htmlFor="diner-count">Number of Diners:</label>
                <input type="number" id="diner-count" name="diner-count" min="1" required />
            </div>
            <div className="form-group">
                <label htmlFor="time">Time:</label>
                <input type="time" id="time" name="time" required />
            </div>
        </form>
    );
}

export default ReservationForm1;