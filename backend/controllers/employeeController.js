const Employee = require('../models/Employee');
const path = require('path');
const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Create new employee
exports.createEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    let image = req.file ? req.file.path.replace(/\\/g, "/") : ''; 

    // Validate email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate mobile is numeric
    if (!/^\d+$/.test(mobile)) {
        return res.status(400).json({ message: 'Mobile number must be numeric' });
    }

    // Check if email is already in use
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if mobile is already in use
    const existingMobile = await Employee.findOne({ mobile });
    if (existingMobile) {
        return res.status(400).json({ message: 'Mobile number already exists' });
    }

    const createDate = new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    });

    try {
        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image,
            createDate
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit employee
exports.editEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Employee ID
exports.getEmployeeById = async (req, res) => {
    const { id } = req.params;
    
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid employee ID" });
    }

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};