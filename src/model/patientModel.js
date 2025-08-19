import pool from "../config/db.js"

export const createPatientService = async (name, contactInfo) => {
    const result = await pool.query(
        "INSERT INTO patients (name, contactInfo) VALUES ($1, $2) RETURNING *",
        [name, contactInfo]
    )
    return result.rows[0];
}

export const getAllPatientsService = async () => {
    const result = await pool.query("SELECT * FROM patients");
    return result.rows;
}

export const getPatientByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM patients where id = $1",[id]);
    return result.rows[0];
}



export const updatePatientService = async (id, name, contactInfo) => {
    const result = await pool.query(
        "UPDATE patients SET name = $1, contactInfo = $2 WHERE id = $3 RETURNING *",
        [name, contactInfo, id]  // order must match $1, $2, $3
    );
    return result.rows[0];
};

export const deletePatientService = async (id) => {
    const result = await pool.query(
        "DELETE FROM patients WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
}

// ✅ Check if patient exists
export const getPatientById = async (id) => {
    const result = await pool.query("SELECT * FROM patients WHERE id = $1", [id]);
    return result.rows[0];
};