import React from 'react';
import '../StaffUI/PagesStyle.css';

function ReportDisplay() {
    return (
        <div className="main-page">
            <h2>Report Details</h2>
            <div className="report-info">
                <div className="info-section">
                    <label>Report Type:</label>
                    <p>Payment Report</p>
                </div>
                <div className="info-section">
                    <label>Date Range:</label>
                    <p>01/01/2024 - 01/31/2024</p>
                </div>
            </div>
            <div className="table-container">
                <table className="main-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01/05/2024</td>
                            <td>TXN123456</td>
                            <td>$500</td>
                            <td>Completed</td>
                        </tr>
                        <tr>
                            <td>01/10/2024</td>
                            <td>TXN654321</td>
                            <td>$200</td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <td>01/15/2024</td>
                            <td>TXN112233</td>
                            <td>$350</td>
                            <td>Failed</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="button-group">
                <button className="export-btn">Export to PDF</button>
                <button className="export-btn">Export to CSV</button>
            </div>
        </div>
    );
}

export default ReportDisplay;