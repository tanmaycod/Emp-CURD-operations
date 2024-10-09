const express = require('express');
const multer = require('multer');
const { createEmployee, getEmployees, editEmployee, deleteEmployee, getEmployeeById } = require('../controllers/employeeController');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to allow only JPG and PNG files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPG and PNG images are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/employees', upload.single('image'), createEmployee); 
router.get('/employees', getEmployees);
router.put('/employees/:id', upload.single('image'), editEmployee);
router.delete('/employees/:id', deleteEmployee);
router.get('/employees/:id', getEmployeeById); 

module.exports = router;
