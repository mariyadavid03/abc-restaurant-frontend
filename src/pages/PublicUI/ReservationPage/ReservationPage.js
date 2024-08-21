import React, { useRef } from 'react';
import Header from "../../../components/Header/PublicHeader/Header";
import ReservationForm1 from "../../../components/Reservation/ReservationForm1";
import ReservationForm2 from "../../../components/Reservation/ReservationForm2";

function ReservationPage(){
    const contactUsRef = useRef(null);

    const scrollToContactUs = () => {
        contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return(
        <><Header onContactUsClick={scrollToContactUs} />
        <div className="reservation-page">
            <h2>Make Your Reservations!</h2>

            <div className="main-container">
                <div className="reservation-form-container">
                    <div className="reservation-details">
                        <ReservationForm1 />
                    </div>
                    <div className="reservation-details">
                        <ReservationForm2 />
                    </div>
                    <button type="submit">Reserve</button>
                </div>
                <div className="reservation-info-container">
                    <h3>Open Hours</h3>
                    <p>Monday - Friday <br />11:00AM - 10:00PM</p>
                    <p>Weekends <br />10:00 AM - 11:30 PM</p>
                    <p>Closed on Bank Holidays</p>
                    <br />
                    <h3>Contact Info</h3>
                    <p>+94 764 7764</p>
                    <p>+94 875 47382</p>
                    <p>abcresturant@gmail.com</p>
                </div>
            </div>


        </div></>

    );
}
export default ReservationPage;