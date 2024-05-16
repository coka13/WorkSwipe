import express from "express"
const router = express.Router()

import { createEmployerController, deleteEmployerController, employerLoginController, getAllEmployersController, getSingleEmployerController, updateEmployerController } from "../controllers/Employer.js"


router.get('/singleEmployer/:id', getSingleEmployerController)
router.get('/allEmployers', getAllEmployersController)
router.post('/employerLogin', employerLoginController)
router.post('/createEmployer', createEmployerController)
router.put('/updateEmployer/:id', updateEmployerController)
router.delete('/deleteEmployer/:id', deleteEmployerController)

export default router