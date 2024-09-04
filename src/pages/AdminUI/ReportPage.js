import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../StaffUI/PagesStyle.css';
import {Link} from 'react-router-dom';

function ReportPage() {
    const [reportType, setReportType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.fromReport) {
            setStartDate('');
            setEndDate('');
        }
    }, [location.state]);

    const handleGenerateReport = async () => {
        try {
            const response = await axios.get('http://localhost:8080/dinein', {
                params: {
                    startDate: `${startDate}T00:00:00`,
                    endDate: `${endDate}T23:59:59`
                }
            });
            navigate('/report-display/reservation', { state: { data: response.data } });
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    const handleGenerateDeliveryReport = async () => {
        try {
            const response = await axios.get('http://localhost:8080/delivery', {
                params: {
                    startDate: `${startDate}T00:00:00`,
                    endDate: `${endDate}T23:59:59`
                }
            });
            navigate('/report-display/delivery', { state: { data: response.data } });
        } catch (error) {
            console.error('Error generating delivery report:', error);
        }
    };

    const handleGeneratePaymentReport = async () => {
        try {
            const response = await axios.get('http://localhost:8080/payment', {
                params: {
                    startDate: `${startDate}T00:00:00`,
                    endDate: `${endDate}T23:59:59`
                }
            });
            navigate('/report-display/payment', { state: { data: response.data } });
        } catch (error) {
            console.error('Error generating payment report:', error);
        }
    };

    const handleGenerateQueryReport = async () => {
        try {
            const queryResponse = await axios.get('http://localhost:8080/query', {
                params: {
                    startDate: `${startDate}T00:00:00`,
                    endDate: `${endDate}T23:59:59`
                }
            });
    
            const queries = queryResponse.data;

            const responseResponse = await axios.get('http://localhost:8080/response');
            const responses = responseResponse.data;
    
            const queriesWithResponses = queries.map(query => {
                const response = responses.find(resp => resp.query.id === query.id);
                return { ...query, response: response || null };
            });
    
            navigate('/report-display/query', { state: { data: queriesWithResponses } });
    
        } catch (error) {
            console.error('Error generating query report:', error);
        }
    };
    const handleGenerateReportClick = () => {
        if (reportType === 'reservation') {
            handleGenerateReport();

        } else if (reportType === 'delivery') {
            handleGenerateDeliveryReport();

        } else if(reportType === 'payment'){
            handleGeneratePaymentReport();

        } else if(reportType === 'query'){
            handleGenerateQueryReport();
        }
    };

    return (
        <div className="page-body">
           <div className="main-page" style={{ width: '48%' }}>
                <Link to="/admin/dashboard">
                    <img src={require("../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back" />
                </Link>
                <h2 className="header">Generate Reports</h2>
                <div className="form-group">
                    <label>Report Type:</label>
                    <select 
                        className="form-input" 
                        value={reportType} 
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="reservation">Reservation</option>
                        <option value="delivery">Delivery</option>
                        <option value="query">Query</option>
                        <option value="payment">Payment</option>
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
                        onClick={handleGenerateReportClick}
                    >
                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportPage;