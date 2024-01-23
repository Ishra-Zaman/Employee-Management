const express = require('express');
const dotnet = require('dotenv');
const connectDB = require('./config/db');
const designationRoutes = require('./routes/designationRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

dotnet.config();

connectDB();

const app = express();

// Middleware
// Will allow to read from request body
app.use(express.json());

app.use("/api/designation", designationRoutes);
app.use("/api/employee", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API started on port ${PORT}`));