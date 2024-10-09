const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes); 
app.use('/api', employeeRoutes);    
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

