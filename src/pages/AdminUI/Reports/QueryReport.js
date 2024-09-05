import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import './ReportStyles.css';

function QueryReport() {
    const location = useLocation();
    const { data } = location.state;
    
    // Calculate response time
    const calculateResponseTime = (createdAt, responseAt) => {
        if (!responseAt) return 'No Response';
        const createdDate = new Date(createdAt);
        const responseDate = new Date(responseAt);
        const diffMs = responseDate - createdDate;
        const diffHrs = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor((diffMs % 3600000) / 60000);
        return `${diffHrs}h ${diffMins}m`;
    };

    // data for CSV export
    const processedData = data.map(row => ({
        id: row.id,
        sender_name: row.sender_name,
        email: row.email,
        query_subject: row.query_subject,
        createdAt: new Date(row.createdAt).toLocaleString(),
        staff_id: row.response && row.response.user ? row.response.user.id : 'No Response',
        response_date_time: row.response ? new Date(row.response.response_date_time).toLocaleString() : 'No Response',
        response_time: calculateResponseTime(row.createdAt, row.response?.response_date_time)
    }));

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Customer Query Report', 14, 20);

        const tableColumn = ["ID", "Sender Name", "Email", "Subject", "Query Added Date", "Staff Responder", "Response Time", "Time Taken to Respond"];
        const tableRows = [];

        data.forEach(row => {
            const rowData = [
                row.id,
                row.sender_name,
                row.email,
                row.query_subject,
                new Date(row.createdAt).toLocaleString(),
                row.response && row.response.user ? row.response.user.username : 'No Response',
                row.response ? new Date(row.response.response_date_time).toLocaleString() : 'No Response',
                calculateResponseTime(row.createdAt, row.response?.response_date_time)
            ];
            tableRows.push(rowData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('query_report.pdf');
    };

    const headers = [
        { label: "ID", key: "id" },
        { label: "Sender Name", key: "sender_name" },
        { label: "Email", key: "email" },
        { label: "Subject", key: "query_subject" },
        { label: "Query Added Date", key: "createdAt" },
        { label: "Staff Responder", key: "username" },
        { label: "Response Time", key: "response_date_time" },
        { label: "Time Taken to Respond", key: "response_time" }
    ];
    const calculateAverageResponseTime = (data) => {
        let totalMinutes = 0;
        let count = 0;
    
        data.forEach(row => {
            const createdAt = new Date(row.createdAt);
            const responseAt = row.response ? new Date(row.response.response_date_time) : null;
            if (responseAt) {
                const diffMs = responseAt - createdAt;
                const diffMins = Math.floor(diffMs / 60000);
                totalMinutes += diffMins;
                count += 1;
            }
        });
    
        return count > 0 ? (totalMinutes / count).toFixed(2) : 'N/A';
    };

    const averageResponseTime = calculateAverageResponseTime(data);
    return (
        <div className='page'>
            <div className="report-main-page">
                <Link to="/manage/report">
                    <img src={require("../../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back" />
                </Link>
                <h2 className='report-heading'>Customer Query Report</h2>

                <div className="report-info">
                    <div className="info-section">
                        <label>Report Type:</label>
                        <p>Customer Query Report</p>
                    </div>
                    <div className="info-section">
                        <label>Date Range:</label>
                        <p>
                            {data.length > 0 
                                ? `${new Date(data[0].createdAt).toLocaleDateString()} - ${new Date(data[data.length - 1].createdAt).toLocaleDateString()}` 
                                : 'No Data'}
                        </p>
                    </div>
                </div>
                <div className="summary-info">
                    {data.length > 0 ? (
                        <>
                            <p><strong>Total Queries:</strong> {data.length}</p>
                            <p><strong>Average Response Time:</strong> {averageResponseTime} minutes</p>
                
                            <div className="table-container">
                                <table className="main-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Sender Name</th>
                                            <th>Email</th>
                                            <th>Subject</th>
                                            <th>Query Added Date</th>
                                            <th>Staff Responder</th>
                                            <th>Response Time</th>
                                            <th>Time Taken to Respond</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.id}</td>
                                                <td>{row.sender_name}</td>
                                                <td>{row.email}</td>
                                                <td>{row.query_subject}</td>
                                                <td>{new Date(row.createdAt).toLocaleString()}</td>
                                                <td>{row.response && row.response.user ? row.response.user.username : 'No Response'}</td>
                                                <td>{row.response ? new Date(row.response.response_date_time).toLocaleString() : 'No Response'}</td>
                                                <td>{calculateResponseTime(row.createdAt, row.response?.response_date_time)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <p>No records found for the selected date range.</p>
                    )}
                </div>
                {data.length > 0 && (
                <div className="button-group">
                    <button className="export-btn" onClick={exportToPDF}>Export to PDF</button>
                    <CSVLink 
                        data={processedData} 
                        headers={headers} 
                        filename="query_report.csv" 
                        className="export-btn"
                    >
                        Export to CSV
                    </CSVLink>
                </div>
                )}
            </div>
        </div>
    );
}

export default QueryReport;
