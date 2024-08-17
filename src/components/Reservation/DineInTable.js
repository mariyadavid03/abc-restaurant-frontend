import React from 'react';
import '../../pages/StaffUI/PagesStyle.css';

function DineInTable() {
    return (
        <table className='reservation-table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date & Time</th>
                    <th>Customer Name</th>
                    <th>Customer Contact</th>
                    <th>Email</th>
                    <th>Special Requests</th>
                    <th> - </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Dine-In 1</td>
                    <td>Data 2</td>
                    <td>Data 3</td>
                    <td>Data 4</td>
                    <td>Data 5</td>
                    <td>Data 6</td>
                </tr>
                {/* Add more rows as needed */}
            </tbody>
        </table>
    );
}

export default DineInTable;