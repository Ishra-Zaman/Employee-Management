const express = require('express');
const dotnet = require('dotenv');
const db = require("./config/database")
const designationRoutes = require('./routes/designationRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors')
const morgan = require('morgan')

dotnet.config();

const app = express();

// Middleware
// Will allow to read from request body
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

app.use("/api/designations", designationRoutes);
app.use("/api/employees", employeeRoutes);

const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log(`Database connection successfully established in this following host: (${db.config.host})`);
    } catch(err) {
        console.log(`Unable to connect with database due to this following error: ${err}`)
    }
}
connectToDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API started on port ${PORT}`));