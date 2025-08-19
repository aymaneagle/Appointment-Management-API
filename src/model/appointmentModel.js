import pool from "../config/db.js";

// ✅ Create appointment
export const createAppointmentService = async (patientId, appointmentDate, appointmentTime, reason) => {
    const result = await pool.query(
        `INSERT INTO appointments 
        (patient_id, appointment_date, appointment_time, reason) 
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [patientId, appointmentDate, appointmentTime, reason]
    );
    let row = result.rows[0];

    if (row) {
        // Rename id → AppointmentId
        row = {
            AppointmentId: row.id,
            PatientId: row.patient_id,
            AppointmentDate: row.appointment_date
                ? row.appointment_date.toString().slice(0, 10)
                : null,
            AppointmentTime: row.appointment_time
                ? row.appointment_time.toString().slice(0, 5)   // HH:MM
                : null,
            Reason: row.reason,
            Message:"Appointment created successfully"
        };
    }

    return row;
};

// ✅ Get all appointments of a patient
export const getAppointmentsByPatientService = async (patientId) => {
    const result = await pool.query(
        "SELECT * FROM appointments WHERE patient_id = $1 ORDER BY appointment_date, appointment_time",
        [patientId]
    );

    const rows = result.rows;

    // Map each row to desired format
    const formattedRows = rows.map(row => ({
        AppointmentId: row.id,
        AppointmentDate: row.appointment_date
            ? row.appointment_date.toString().slice(0, 10)
            : null,
        AppointmentTime: row.appointment_time
            ? row.appointment_time.toString().slice(0, 5)
            : null,
        Reason: row.reason,
    }));

    return formattedRows;
};


// ✅ Update appointment
export const updateAppointmentService = async (id, appointmentDate, appointmentTime, reason) => {
    const result = await pool.query(
        `UPDATE appointments
         SET appointment_date=$1, appointment_time=$2, reason=$3
         WHERE id=$4 RETURNING *`,
        [appointmentDate, appointmentTime, reason, id]
    );

    let row = result.rows[0];

    if (row) {
        // Rename id → AppointmentId
        row = {
            AppointmentId: row.id,
            PatientId: row.patient_id,
            AppointmentDate: row.appointment_date
                ? row.appointment_date.toString().slice(0, 10)
                : null,
            AppointmentTime: row.appointment_time
                ? row.appointment_time.toString().slice(0, 5)   // HH:MM
                : null,
            Reason: row.reason,
            Message:"Appointment updated successfully"
        };
    }

    return row;
};

// ✅ Delete appointment
export const deleteAppointmentService = async (id) => {
    const result = await pool.query(
        "DELETE FROM appointments WHERE id=$1 RETURNING *",
        [id]
    );
    let row = result.rows[0];

    if (row) {
        // Rename id → AppointmentId
        row = {
            AppointmentId: row.id,
            PatientId: row.patient_id,
            AppointmentDate: row.appointment_date
                ? row.appointment_date.toString().slice(0, 10)
                : null,
            AppointmentTime: row.appointment_time
                ? row.appointment_time.toString().slice(0, 5)   // HH:MM
                : null,
            Reason: row.reason,
            Message:"Appointment deleted successfully"
        };
    }

    return row;
};
