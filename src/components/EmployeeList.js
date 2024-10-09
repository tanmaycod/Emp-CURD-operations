import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css'; 

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(5); 
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                setEmployees(response.data);
                setFilteredEmployees(response.data); 
            } catch (error) {
                alert("Error fetching employees: " + error.response?.data?.message || error.message);
            }
        };
        fetchEmployees();
    }, []);

    
    useEffect(() => {
        const filtered = employees.filter(employee => 
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee._id.includes(searchTerm) 
        );
        setFilteredEmployees(filtered);
    }, [searchTerm, employees]);

   
    const handleSort = (field) => {
        const sorted = [...filteredEmployees];
        const direction = sortDirection === 'asc' ? 'desc' : 'asc';
        
        sorted.sort((a, b) => {
            if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredEmployees(sorted);
        setSortField(field);
        setSortDirection(direction);
    };

    
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${id}`);
            setEmployees(employees.filter(employee => employee._id !== id));
            alert("Employee deleted successfully!");
        } catch (error) {
            alert("Error deleting employee: " + error.response?.data?.message || error.message);
        }
    };

    
    const handleActiveToggle = (id) => {
        const updatedEmployees = employees.map(employee =>
            employee._id === id ? { ...employee, active: !employee.active } : employee
        );
        setEmployees(updatedEmployees);
    };

    const getSortIcon = (field) => {
        if (sortField === field) {
            return sortDirection === 'asc' ? '▲' : '▼'; 
        }
        return ''; 
    };

    return (
        <div className="container mt-4">
            <h1>Employee List</h1>

            
            <div className="row mb-4">
                <div className="col-md-6">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by Name, Email, or ID" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
            </div>

            
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('_id')}>ID {getSortIcon('_id')}</th> 
                        <th>Image</th>
                        <th onClick={() => handleSort('name')}>Name {getSortIcon('name')}</th>
                        <th onClick={() => handleSort('email')}>Email {getSortIcon('email')}</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Courses</th>
                        <th onClick={() => handleSort('createDate')}>Create Date {getSortIcon('createDate')}</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee._id}</td> 
                            <td>
                                {employee.image && (
                                    <img 
                                        src={`http://localhost:5000/${employee.image}`}
                                        alt={employee.name} 
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                                    />
                                )}
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.course.join(', ')}</td>
                            <td>{employee.createDate}</td>
                            <td>
                                <button 
                                    className={`btn ${employee.active ? 'btn-success' : 'btn-danger'}`}
                                    onClick={() => handleActiveToggle(employee._id)}
                                >
                                    {employee.active ? 'Active' : 'Inactive'}
                                </button>
                            </td>
                            <td>
                                <Link to={`/edit/${employee._id}`} className="btn btn-warning">Edit</Link>
                                <button onClick={() => handleDelete(employee._id)} className="btn btn-danger ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(filteredEmployees.length / employeesPerPage)).keys()].map(num => (
                        <li key={num + 1} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                            <button onClick={() => handlePageChange(num + 1)} className="page-link">
                                {num + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default EmployeeList;
