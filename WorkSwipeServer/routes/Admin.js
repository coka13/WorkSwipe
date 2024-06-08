import express from "express"
const router = express.Router()

import { adminLoginController, createAdminController, deleteAdminController, getAllAdminsController, getSingleAdminController, updateAdminController } from "../controllers/Admin.js"
import { verifyUser } from "../utils/verifyUser.js"

router.get('/singleAdmin/:id', verifyUser, getSingleAdminController)
router.get('/allAdmins', verifyUser, getAllAdminsController)
router.post('/createAdmin', createAdminController)
router.post('/adminLogin', adminLoginController)
router.put('/adminUpdate/:id',  updateAdminController)
router.delete('/deleteAdmin/:id', verifyUser, deleteAdminController)

export default router

