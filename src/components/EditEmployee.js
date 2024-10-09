import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css'; 

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: ''
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                alert("Error fetching employee details: " + error.response?.data?.message || error.message);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'course') {
            setEmployee(prevState => ({
                ...prevState,
                course: prevState.course.includes(value)
                    ? prevState.course.filter(course => course !== value)
                    : [...prevState.course, value]
            }));
        } else {
            setEmployee(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        setEmployee({ ...employee, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in employee) {
            formData.append(key, employee[key]);
        }

        try {
            await axios.put(`http://localhost:5000/api/employees/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Employee updated successfully!");
            navigate("/dashboard");
        } catch (error) {
            alert("Error updating employee: " + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="container">
            <h1>Edit Employee</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="name" value={employee.name} placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" value={employee.email} placeholder="Email" onChange={handleChange} required />
                <input type="text" name="mobile" value={employee.mobile} placeholder="Mobile" onChange={handleChange} required />
                <select name="designation" value={employee.designation} onChange={handleChange} required>
                    <option value="">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>
                <div>
                    <label>
                        <input type="radio" name="gender" value="M" onChange={handleChange} checked={employee.gender === 'M'} required /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="F" onChange={handleChange} checked={employee.gender === 'F'} required /> Female
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="course" value="MCA" onChange={handleChange} checked={employee.course.includes('MCA')} /> MCA
                    </label>
                    <label>
                        <input type="checkbox" name="course" value="BCA" onChange={handleChange} checked={employee.course.includes('BCA')} /> BCA
                    </label>
                    <label>
                        <input type="checkbox" name="course" value="BSC" onChange={handleChange} checked={employee.course.includes('BSC')} /> BSC
                    </label>
                </div>
                <input type="file" name="image" onChange={handleImageChange} />
                <button type="submit" className="btn btn-primary">Update Employee</button>
            </form>
        </div>
    );
};

export default EditEmployee;
