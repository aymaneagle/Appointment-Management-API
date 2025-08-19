import pool from "../config/db.js"

const createPatientTable = async() => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL ,
    contactInfo VARCHAR(100) UNIQUE NOT NULL ,
    created_at TIMESTAMP DEFAULT NOW()
)
    `;
    try {
await pool.query(queryText);
console.log("Patient table created if not exists");
    } catch (error){
console.error("Error creating Patient table:", error);
    }
}

export default createPatientTable;