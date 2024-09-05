import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import './ReportStyles.css';

function DeliveryReport() {
    const location = useLocation();
    const { data } = location.state;
    const totalDeliveries = data.length;

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Delivery Report', 14, 20);

        const tableColumn = ["Delivery Code", "Address", "Date & Time", "Status", "Customer Name"];
        const tableRows = [];

        data.forEach(row => {
            const rowData = [
                row.delivery_code,
                row.delivery_address,
                new Date(row.createdAt).toLocaleString(),
                row.status,
                row.price,
                row.user.name
            ];
            tableRows.push(rowData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('delivery_report.pdf');
    };

    const headers = [
        { label: "Delivery Code", key: "delivery_code" },
        { label: "Address", key: "delivery_address" },
        { label: "Date & Time", key: "createdAt" },
        { label: "Status", key: "status" },
        { label: "Customer Name", key: "user.name" }
    ];

    return (
        <div className='page'>
            <div className="report-main-page">
                <Link to="/manage/report">
                    <img src={require("../../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back" />
                </Link>
                <h2 className='report-heading'>Delivery Report</h2>

                <div className="report-info">
                    <div className="info-section">
                        <label>Report Type:</label>
                        <p>Delivery Report</p>
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
                        <p><strong>Total Deliveries:</strong> {totalDeliveries}</p>
                        <div className="table-container">
                            <table className="main-table">
                                <thead>
                                    <tr>
                                        <th>Delivery Code</th>
                                        <th>Address</th>
                                        <th>Date & Time</th>
                                        <th>Status</th>
                                        <th>Customer Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.delivery_code}</td>
                                            <td>{row.delivery_address}</td>
                                            <td>{new Date(row.createdAt).toLocaleString()}</td>
                                            <td>{row.status}</td>
                                            <td>{row.user.name}</td>
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
                    
                    <CSVLink data={data} headers={headers} filename="delivery_report.csv" className="export-btn">
                        Export to CSV
                    </CSVLink>
                </div>
                )}
            </div>
        </div>
    );
}

export default DeliveryReport;
