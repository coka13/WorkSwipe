import express from "express"
const router = express.Router()

import { createTechnologyController, deleteTechnologyController, getAllTechnologiesController } from "../controllers/Technologies.js"
import { verifyUser } from "../utils/verifyUser.js"

router.get('/allTechnologies', getAllTechnologiesController)
router.post('/createTechnology', verifyUser,createTechnologyController)
router.delete('/deleteTechnology/:id',verifyUser, deleteTechnologyController)


export default router