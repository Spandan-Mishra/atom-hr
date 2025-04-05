require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConnect = require('./config/db');

const managerRoutes = require('./routes/managerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
dbConnect();

app.use(cors());
app.use(express.json());

app.get('/checkup', (req, res) => {
    res.json({
        message: "Backend is up"
    })
})

app.use('/managers', managerRoutes);
app.use('/employees', employeeRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
