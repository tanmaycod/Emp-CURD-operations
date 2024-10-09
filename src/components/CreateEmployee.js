import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CreateEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateMobile = (mobile) => {
        return /^\d+$/.test(mobile);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'course') {
            setEmployee(prev => ({
                ...prev,
                course: prev.course.includes(value)
                    ? prev.course.filter(course => course !== value)
                    : [...prev.course, value]
            }));
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setEmployee({ ...employee, image: file });
        } else {
            setErrors({ ...errors, image: 'Only JPG or PNG files are allowed.' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!employee.name) formErrors.name = 'Name is required';
        if (!validateEmail(employee.email)) formErrors.email = 'Invalid email address';
        if (!validateMobile(employee.mobile)) formErrors.mobile = 'Phone number must be numeric';
        if (!employee.designation) formErrors.designation = 'Designation is required';
        if (!employee.gender) formErrors.gender = 'Gender is required';
        if (!employee.course.length) formErrors.course = 'At least one course is required';
        if (!employee.image) formErrors.image = 'Image is required (JPG or PNG)';

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            const formData = new FormData();
            for (const key in employee) {
                formData.append(key, employee[key]);
            }

            try {
                await axios.post('http://localhost:5000/api/employees', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert("Employee created successfully!");
                navigate("/dashboard");
            } catch (error) {
                alert("Error creating employee: " + (error.response?.data?.message || error.message));
            }
        }
    };

    return (
        <div className="container">
            <h1>Create New Employee</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="name" value={employee.name} placeholder="Name" onChange={handleChange} required />
                {errors.name && <p className="text-danger">{errors.name}</p>}
                
                <input type="email" name="email" value={employee.email} placeholder="Email" onChange={handleChange} required />
                {errors.email && <p className="text-danger">{errors.email}</p>}

                <input type="text" name="mobile" value={employee.mobile} placeholder="Mobile" onChange={handleChange} required />
                {errors.mobile && <p className="text-danger">{errors.mobile}</p>}

                <select name="designation" value={employee.designation} onChange={handleChange} required>
                    <option value="">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>
                {errors.designation && <p className="text-danger">{errors.designation}</p>}

                <div>
                    <label>
                        <input type="radio" name="gender" value="M" onChange={handleChange} /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="F" onChange={handleChange} /> Female
                    </label>
                </div>
                {errors.gender && <p className="text-danger">{errors.gender}</p>}

                <div>
                    <label>
                        <input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA
                    </label>
                    <label>
                        <input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA
                    </label>
                    <label>
                        <input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC
                    </label>
                </div>
                {errors.course && <p className="text-danger">{errors.course}</p>}

                <input type="file" name="image" onChange={handleFileChange} />
                {errors.image && <p className="text-danger">{errors.image}</p>}

                <button type="submit" className="btn btn-primary">Create Employee</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
