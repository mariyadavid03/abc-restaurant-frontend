import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import './ReportStyles.css';

function PaymentReport() {
    const location = useLocation();
    const { data } = location.state;
    const totalPayments = data.length;

    // total amount
    const totalAmount = data.reduce((sum, row) => sum + parseFloat(row.amount), 0).toFixed(2);
    
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Payment Report', 14, 20);

        const tableColumn = ["ID", "Payment Date & Time", "Amount", "Delivery Code", "Customer Name"];
        const tableRows = [];

        data.forEach(row => {
            const rowData = [
                row.id,
                new Date(row.createdAt).toLocaleString(),
                row.amount,
                row.delivery.delivery_code,
                row.delivery.user.name
            ];
            tableRows.push(rowData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('payment_report.pdf');
    };

    const headers = [
        { label: "ID", key: "id" },
        { label: "Payment Date & Time", key: "createdAt" },
        { label: "Amount", key: "amount" },
        { label: "Delivery Code", key: "delivery.delivery_code" },
        { label: "Customer Name", key: "delivery.user.name" }
    ];

    return (
        <div className='page'>
            <div className="report-main-page">
                <Link to="/manage/report">
                    <img src={require("../../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back" />
                </Link>
                <h2 className='report-heading'>Payment Report</h2>

                <div className="report-info">
                    <div className="info-section">
                        <label>Report Type:</label>
                        <p>Payment Report</p>
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
                    <p><strong>Total Payments:</strong> {totalPayments}</p>
                    <p><strong>Total Amount:</strong> LKR {totalAmount}</p>
                </div>
                <div className="table-container">
                    <table className="main-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Payment Date & Time</th>
                                <th>Amount (LKR)</th>
                                <th>Delivery Code</th>
                                <th>Customer Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.id}</td>
                                    <td>{new Date(row.createdAt).toLocaleString()}</td>
                                    <td>{row.amount}</td>
                                    <td>{row.delivery.delivery_code}</td>
                                    <td>{row.delivery.user.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="button-group">
                    <button className="export-btn" onClick={exportToPDF}>Export to PDF</button>
                    <CSVLink data={data} headers={headers} filename="payment_report.csv" className="export-btn">
                        Export to CSV
                    </CSVLink>
                </div>
            </div>
        </div>
    );
}

export default PaymentReport;
