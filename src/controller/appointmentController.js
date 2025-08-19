import {
    createAppointmentService,
    getAppointmentsByPatientService,
    updateAppointmentService,
    deleteAppointmentService,
} from "../model/appointmentModel.js";

import { getPatientByIdService } from "../model/patientModel.js";
import handleResponse from "../utils/handleRespnse.js"

/// ✅ Create appointment with patient validation
export const createAppointment = async (req, res, next) => {
    const { patientId, appointmentDate, appointmentTime, reason } = req.body;
    try {
        const patient = await getPatientByIdService(patientId);
        if (!patient) return handleResponse(res, 404, "Patient not found");

        const appointment = await createAppointmentService(patientId, appointmentDate, appointmentTime, reason);
        handleResponse(res, 201, "Appointment created successfully", appointment);
    } catch (err) {
        next(err);
    }
};

// ✅ Get appointments by patient
export const getAppointmentsByPatient = async (req, res, next) => {
    try {
        const appointments = await getAppointmentsByPatientService(req.params.patientId);
        handleResponse(res, 200, "Appointments fetched successfully", appointments);
    } catch (err) {
        next(err);
    }
};

// ✅ Update appointment
export const updateAppointment = async (req, res, next) => {
    const { appointmentDate, appointmentTime, reason } = req.body;
    try {
        const updatedAppointment = await updateAppointmentService(req.params.id, appointmentDate, appointmentTime, reason);
        if (!updatedAppointment) return handleResponse(res, 404, "Appointment not found");
        handleResponse(res, 200, "Appointment updated successfully", updatedAppointment);
    } catch (err) {
        next(err);
    }
};

// ✅ Delete appointment
export const deleteAppointment = async (req, res, next) => {
    try {
        const deletedAppointment = await deleteAppointmentService(req.params.id);
        if (!deletedAppointment) return handleResponse(res, 404, "Appointment not found");
        handleResponse(res, 200, "Appointment deleted successfully", deletedAppointment);
    } catch (err) {
        next(err);
    }
};