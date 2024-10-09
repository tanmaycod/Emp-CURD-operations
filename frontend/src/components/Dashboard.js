import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeList from './EmployeeList';
import Cookies from 'js-cookie';
import './styles.css'; 

const Dashboard = () => {
    const username = Cookies.get('username');
    const navigate = useNavigate();

    
    const handleLogout = () => {
       
        Cookies.remove('username'); 
        Cookies.remove('token'); 
        navigate('/');
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Welcome, {username ? username : 'User'}</h1>
                
                <button onClick={handleLogout} className="btn btn-danger float-right">Logout</button>
            </div>

            <div className="text-center mb-4">
                <Link to="/create" className="btn btn-primary">Create Employee</Link>
            </div>

            <EmployeeList />
        </div>
    );
};

export default Dashboard;
