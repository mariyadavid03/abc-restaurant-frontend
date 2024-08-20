import React, { useState } from 'react';
import './PagesStyle.css';

function ManagePayment(){
    return (
        <div className='page-body'>
            <div className="main-page">
                <img src={require("../../assets/images/arrow.png")} className="back-arrow" alt="Go Back"/>
                <h2>Customer Reservations</h2>

                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Delivery ID</th>
                                <th>Payment DateTime</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data 1</td>
                                <td>Data 2</td>
                                <td>Data 3</td>
                                <td>Date 4</td>
                                <td>Date 4</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ManagePayment;