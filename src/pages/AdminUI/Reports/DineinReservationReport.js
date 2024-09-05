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
                row.reservationDateTime,
                row.num_guests,
                row.status,
                row.createdAt
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
        { label: "Reservation Date", key: "reservationDateTime" },
        { label: "No. of Guests", key: "num_guests" },
        { label: "Status", key: "status" },
        { label: "Created At", key: "createdAt" }
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
                            ? `${new Date(data[0].reservationDateTime).toLocaleDateString()} - ${new Date(data[data.length - 1].reservationDateTime).toLocaleDateString()}` 
                            : 'No Data'}
                        </p>
                    </div>
                </div>
                <div className="summary-info">
                    {data.length > 0 ? (
                        <>
                        <p><strong>Total Reservations:</strong> {totalReservations}</p>
                            
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
                                            <td>{row.reservationDateTime}</td>
                                            <td>{row.num_guests}</td>
                                            <td>{row.status}</td>
                                            <td>{row.createdAt}</td>
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
                    <CSVLink data={data} headers={headers} filename="reservation_report.csv" className="export-btn">
                        Export to CSV
                    </CSVLink>
                </div>
                )}
            </div>
        </div>
    );
}

export default DineinReservationReport;