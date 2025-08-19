import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db.js"
import router from "./routes/api.js";
import errorHandling from "./src/middleware/errorHandler.js";
import createPatientTable from "./src/data/createPatientTable.js";
import {createPatientService} from "./src/model/patientModel.js";
import createAppointmentTable from "./src/data/createAppointmentTable.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


dotenv.config();

const app = express();
////////////////////////
const port = process.env.PORT || 8000;

//Middlewares
app.use (express.json());
app.use(cors());

//Routes
app.use("/api", router);

//Error handling middleware
app.use(errorHandling);

//Create table before starting server
createPatientTable()
createAppointmentTable()

//Testing POSTGRES Connection
app.get("/", async (req, res) => {
    console.log("Start")
    const result = await pool.query("SELECT current_database()");
    console.log("Database name is:", result.rows[0].current_database);
    res.send(`The database name is : ${result.rows[0].current_database}`)
})

//server ///////////////////////////////////////////////////////
app.listen(port, () =>
    console.log(`Listening on port ${port}`));




// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Appointment Management API",
            version: "1.0.0",
            description: "API documentation for Patients and Appointments",
        },
    },
    apis: ["./routes/*.js"], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Test DB connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`Database: ${result.rows[0].current_database}`);
});
