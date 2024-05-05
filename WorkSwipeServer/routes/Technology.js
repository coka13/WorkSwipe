import express from "express"
const router = express.Router()

import { createTechnologyController, deleteTechnologyController, getAllTechnologiesController } from "../controllers/Technologies.js"

router.get('/api/allTechnologies', getAllTechnologiesController)
router.post('/api/createTechnology', createTechnologyController)
router.delete('/api/deleteTechnology/:id', deleteTechnologyController)


export default router