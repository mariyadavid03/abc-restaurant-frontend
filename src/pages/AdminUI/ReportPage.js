import React, { useState } from 'react';
import '../StaffUI/PagesStyle.css';

function ReportPage() {
    const [reportType, setReportType] = useState('payment');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleGenerateReport = () => {
        console.log(`Generating ${reportType} report from ${startDate} to ${endDate}`);
    };

    return (
        <div className="page-body">
            <div className="main-page">
                <h2 className="header">Generate Reports</h2>
                <div className="form-group">
                    <label>Report Type:</label>
                    <select 
                        className="form-input" 
                        value={reportType} 
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="payment">Payment Report</option>
                        <option value="reservation">Reservation Report</option>
                        <option value="query">Query Report</option>
                        <option value="menu">Menu Report</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Start Date:</label>
                    <input 
                        type="date" 
                        className="form-input" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>End Date:</label>
                    <input 
                        type="date" 
                        className="form-input" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                    />
                </div>
                <div className="button-group">
                    <button 
                        className="generate-btn" 
                        onClick={handleGenerateReport}
                    >
                        Generate Report
                    </button>
                    <button className="export-btn">Export to PDF</button>
                    <button className="export-btn">Export to CSV</button>
                </div>
            </div>
        </div>
    );
}

export default ReportPage;