import express from "express"
const router = express.Router()

import { createEmployerController, deleteEmployerController, employerLoginController, getAllEmployersController, getSingleEmployerController, updateEmployerController,updateEmployerPasswordController } from "../controllers/Employer.js"
import { verifyUser } from "../utils/verifyUser.js"


router.get('/singleEmployer/:id', verifyUser, getSingleEmployerController)
router.get('/allEmployers', verifyUser,getAllEmployersController)
router.post('/employerLogin', employerLoginController)
router.post('/createEmployer', createEmployerController)
router.put('/updateEmployer/:id', updateEmployerController)
router.put('/updateEmployer/:id', verifyUser,updateEmployerPasswordController)
router.delete('/deleteEmployer/:id',verifyUser, deleteEmployerController)

export default router