import express from "express"
const router = express.Router()

import { createEmployerController, deleteEmployerController, employerLoginController, getAllEmployersController, getSingleEmployerController, updateEmployerController } from "../controllers/Employer.js"


router.get('/api/employerLogin', employerLoginController)
router.get('/api/singleEmployer/:id', getSingleEmployerController)
router.get('/api/allEmployers', getAllEmployersController)
router.post('/api/createEmployer', createEmployerController)
router.put('/api/updateEmployer/:id', updateEmployerController)
router.delete('/api/deleteEmployer/:id', deleteEmployerController)

export default router