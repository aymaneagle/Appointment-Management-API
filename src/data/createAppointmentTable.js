import pool from "../config/db.js";

const createAppointmentTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        patient_id INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        reason VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
    )
  `;
    try {
        await pool.query(queryText); // ✅ await added
        console.log("Appointments table created if not exists");
    } catch (error) {
        console.error("Error creating appointments table:", error);
    }
};

export default createAppointmentTable;
