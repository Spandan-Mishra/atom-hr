require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConnect = require('./config/db');

const managerRoutes = require('./routes/managerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
dbConnect();

app.use(cors());
app.use(express.json());

app.use('/managers', managerRoutes);
app.use('/employees', employeeRoutes);
app.use('/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
