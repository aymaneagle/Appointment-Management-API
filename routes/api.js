import express from "express";
import {createPatient, getAllPatients, getPatientById, deletePatient, updatePatient} from "../src/controller/patientController.js";
import {createAppointment, getAppointmentsByPatient, updateAppointment, deleteAppointment} from "../src/controller/appointmentController.js";
const router = express.Router();


//router.get('/getAllPatients', getAllPatients)
//router.get('/getPatientById', getPatientById)


router.post('/createPatient', createPatient);
router.get('/getAllPatients', getAllPatients)
router.get('/getPatientById/:id', getPatientById)
router.put('/updatePatient/:id', updatePatient)
router.delete('/deletePatient/:id', deletePatient);

//Appointment route
router.post("/createAppointment", createAppointment);
router.get("/getAppointmentsByPatient/:patientId", getAppointmentsByPatient);
router.put("/updateAppointment/:id", updateAppointment);
router.delete("/deleteAppointment/:id", deleteAppointment);


export default router;

/**
 * @swagger
 * tags:
 *   - name: Patients
 *     description: Patient management
 *   - name: Appointments
 *     description: Appointment management
 */

/**
 * @swagger
 * /api/createPatient:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient created successfully
 */
router.post('/createPatient', createPatient);

/**
 * @swagger
 * /getAllPatients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 */
router.get('/getAllPatients', getAllPatients);

/**
 * @swagger
 * /getPatientById/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient details
 */
router.get('/getPatientById/:id', getPatientById);

/**
 * @swagger
 * /updatePatient/{id}:
 *   put:
 *     summary: Update patient info
 *     tags: [Patients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient updated successfully
 */
router.put('/updatePatient/:id', updatePatient);

/**
 * @swagger
 * /deletePatient/{id}:
 *   delete:
 *     summary: Delete a patient
 *     tags: [Patients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 */
router.delete('/deletePatient/:id', deletePatient);

/**
 * @swagger
 * /createAppointment:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *               appointmentDate:
 *                 type: string
 *                 example: 2025-08-21
 *               appointmentTime:
 *                 type: string
 *                 example: 14:30
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created successfully
 */
router.post("/createAppointment", createAppointment);

/**
 * @swagger
 * /getAppointmentsByPatient/{patientId}:
 *   get:
 *     summary: Get all appointments for a patient
 *     tags: [Appointments]
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of appointments
 */
router.get("/getAppointmentsByPatient/:patientId", getAppointmentsByPatient);

/**
 * @swagger
 * /updateAppointment/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentDate:
 *                 type: string
 *                 example: 2025-08-21
 *               appointmentTime:
 *                 type: string
 *                 example: 14:30
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 */
router.put("/updateAppointment/:id", updateAppointment);

/**
 * @swagger
 * /deleteAppointment/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 */
router.delete("/deleteAppointment/:id", deleteAppointment);
