import express from "express"
const router = express.Router()

import { createMatchController, deleteMatchController, getAllMatchesByEmployerIdController, getAllMatchesByJobOpportunityIdController, getAllMatchesByJobSeekerIdController,  updateMatchController } from "../controllers/Match.js"
import { verifyUser } from "../utils/verifyUser.js"

router.get('/allMatchesByEmployer/:employerId', verifyUser, getAllMatchesByEmployerIdController)
router.get('/allMatchesByJobSeeker/:jobSeekerId', verifyUser, getAllMatchesByJobSeekerIdController)
router.get('/allMatchesByJobOpportunity/:jobOpportunityId', verifyUser, getAllMatchesByJobOpportunityIdController)
router.post('/createMatch/employer/:employerId/jobSeeker/:jobSeekerId/jobOpportunity/:jobOpportunityId', verifyUser, createMatchController)
router.put('/updateMatch/:id', verifyUser, updateMatchController)
router.delete('/deleteMatch/:id', verifyUser, deleteMatchController)

export default router