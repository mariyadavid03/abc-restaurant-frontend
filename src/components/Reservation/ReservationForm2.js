import React from "react";
import './ReservationFormStyle.css';

function ReservationForm2() {
    return (
        <form className="reservation-form">
            <h2>Personal Details</h2>
            <div className="form-name-group">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <select id="title" name="title" required>
                        <option value="mr">Mr.</option>
                        <option value="mrs">Mrs.</option>
                        <option value="ms">Ms.</option>
                        <option value="dr">Dr.</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="first-name">First Name:</label>
                    <input type="text" id="first-name" name="first-name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Last Name:</label>
                    <input type="text" id="last-name" name="last-name" required />
                </div>
            </div>
            

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
                <label htmlFor="contact-no">Contact Number:</label>
                <input type="tel" id="contact-no" name="contact-no" required />
            </div>
            <div className="form-group">
                <label htmlFor="special-requests">Special Requests:</label>
                <textarea id="special-requests" name="special-requests" rows="4"></textarea>
            </div>
        </form>
    );
}

export default ReservationForm2;