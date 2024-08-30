import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import './ReportStyles.css';

function DineinReservationReport() {
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state;
    const totalReservations = data.length;

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Reservation Report', 14, 20);
        
        const tableColumn = ["Reservation Code", "Customer Name", "Email", "Reservation Date", "No. of Guests", "Status", "Created At"];
        const tableRows = [];

        data.forEach(row => {
            const rowData = [
                row.reservation_code,
                row.user.name,
                row.user.email,
                row.reservation_date_time,
                row.num_guests,
                row.status,
                row.created_at
            ];
            tableRows.push(rowData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('reservation_report.pdf');
    };

    const handleBack = () => {
        navigate('/admin/report', { state: { fromReport: true } });
    };

    const headers = [
        { label: "Reservation Code", key: "reservation_code" },
        { label: "Customer Name", key: "user.name" },
        { label: "Email", key: "user.email" },
        { label: "Reservation Date", key: "reservation_date_time" },
        { label: "No. of Guests", key: "num_guests" },
        { label: "Status", key: "status" },
        { label: "Created At", key: "created_at" }
    ]; 

    return (
        <div className='page'>
            <div className="report-main-page">
                <Link to="/manage/report">
                    <img src={require("../../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back" onClick={handleBack}/>
                </Link>
                <h2 className='report-heading'>Reservation Report</h2>
                <div className="report-info">
                    <div className="info-section">
                        <label>Report Type:</label>
                        <p>Reservation Report</p>
                    </div>
                    <div className="info-section">
                        <label>Date Range:</label>
                        <p>
                        {data.length > 0 
                            ? `${new Date(data[0].reservation_date_time).toLocaleDateString()} - ${new Date(data[data.length - 1].reservation_date_time).toLocaleDateString()}` 
                            : 'No Data'}
                        </p>
                    </div>
                </div>
                <div className="summary-info">
                    <p><strong>Total Reservations:</strong> {totalReservations}</p>
                </div>
                <div className="table-container">
                    <table className="main-table">
                        <thead>
                            <tr>
                                <th>Reservation Code</th>
                                <th>Customer Name</th>
                                <th>Email</th>
                                <th>Reservation Date</th>
                                <th>No. of Guests</th>
                                <th>Status</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.reservation_code}</td>
                                    <td>{row.user.name}</td>
                                    <td>{row.user.email}</td>
                                    <td>{row.reservation_date_time}</td>
                                    <td>{row.num_guests}</td>
                                    <td>{row.status}</td>
                                    <td>{row.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="button-group">
                    <button className="export-btn" onClick={exportToPDF}>Export to PDF</button>
                    <CSVLink data={data} headers={headers} filename="reservation_report.csv" className="export-btn">
                        Export to CSV
                    </CSVLink>
                </div>
            </div>
        </div>
    );
}

export default DineinReservationReport;