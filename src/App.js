import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import EditEmployee from './components/EditEmployee';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateEmployee />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/edit/:id" element={<EditEmployee />} />
            </Routes>
        </Router>
    );
};

export default App;




