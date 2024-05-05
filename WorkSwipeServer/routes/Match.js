import express from "express"
const router = express.Router()

import { createMatchController, deleteMatchController, getAllMatchesByEmployerIdController, getAllMatchesByJobOpportunityIdController, getAllMatchesByJobSeekerIdController,  updateMatchController } from "../controllers/Match.js"

router.get('/api/updateMatch/:id', updateMatchController)
router.get('/api/allMatchesByEmployer/:employerId', getAllMatchesByEmployerIdController)
router.get('/api/allMatchesByJobSeeker/:jobSeekerId', getAllMatchesByJobSeekerIdController)
router.get('/api/allMatchesByJobOpportunity/:jobOpportunityId', getAllMatchesByJobOpportunityIdController)
router.post('/api/createMatch/employer/:employerId/jobSeeker/:jobSeekerId/jobOpportunity/:jobOpportunityId', createMatchController)
router.delete('/api/deleteMatch/:id', deleteMatchController)

export default router