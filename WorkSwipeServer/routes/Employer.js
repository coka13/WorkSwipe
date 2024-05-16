import express from "express"
const router = express.Router()

import { createEmployerController, deleteEmployerController, employerLoginController, getAllEmployersController, getSingleEmployerController, updateEmployerController } from "../controllers/Employer.js"
import { verifyUser } from "../utils/verifyUser.js"


router.get('/singleEmployer/:id', verifyUser, getSingleEmployerController)
router.get('/allEmployers', verifyUser,getAllEmployersController)
router.post('/employerLogin', employerLoginController)
router.post('/createEmployer', createEmployerController)
router.put('/updateEmployer/:id', verifyUser,updateEmployerController)
router.delete('/deleteEmployer/:id',verifyUser, deleteEmployerController)

export default router