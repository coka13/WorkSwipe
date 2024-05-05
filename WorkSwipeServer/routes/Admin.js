import express from "express"
const router = express.Router()

import { adminLoginController, createAdminController, deleteAdminController, getAllAdminsController, getSingleAdminController, updateAdminController } from "../controllers/Admin.js"

router.get('/adminLogin', adminLoginController)
router.get('/singleAdmin/:id', getSingleAdminController)
router.get('/allAdmins', getAllAdminsController)
router.post('/createAdmin', createAdminController)
router.put('/adminUpdate/:id', updateAdminController)
router.delete('/deleteAdmin/:id', deleteAdminController)

export default router

