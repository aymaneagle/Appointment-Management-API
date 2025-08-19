import {
    createPatientService,
    getAllPatientsService,
    getPatientByIdService,
    updatePatientService,
    deletePatientService
} from "../model/patientModel.js";

const handleResponse = (res, status, message, data =null) =>{
   res.status(status).json({
    status,
    message,
    data,
})
}

export const createPatient = async (req, res, next) => {
    const {name, contactInfo } = req.body;
    try{
        const newPatient = await createPatientService(name, contactInfo);
        handleResponse(res, 201, "Patient created successfully",newPatient);
    }catch(err){
        next(err);
    }
}

export const getAllPatients = async (req, res, next) => {
    try{
        const patients = await getAllPatientsService();
        handleResponse(res, 200, "Patients fetched successfully",patients);
    }catch(err){
        next(err);
    }
}

export const getPatientById = async (req, res, next) => {
    try{
        const patient= await getPatientByIdService(req.params.id);
        if (!patient) return handleResponse(res, 200, "Patient not found");
        handleResponse(res, 200, "Patients fetched successfully",patient);
    }catch(err){
        next(err);
    }
}

export const updatePatient = async (req, res, next) => {
    const{name, contactInfo} = req.body;
    try{
        const updatedPatient= await updatePatientService(req.params.id, name, contactInfo);
        if (!updatedPatient) return handleResponse(res, 200, "Patient not found");
        handleResponse(res, 200, "Patients updated successfully",updatedPatient);
    }catch(err){
        next(err);
    }
}

export const deletePatient = async (req, res, next) => {
    try{
        const deletedPatient= await deletePatientService(req.params.id);
        if (!deletedPatient) return handleResponse(res, 200, "Patient not found");
        handleResponse(res, 200, "Patients deleted successfully",deletedPatient);
    }catch(err){
        next(err);
    }
}