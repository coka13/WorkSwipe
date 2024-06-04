import express from "express"
const router = express.Router()

import { createJobOpportunityController, deleteJobOpportunityByEmployerIDController, deleteJobOpportunityController, getAllJobOpportunitiesController, getSingleJobOpportunityController, updateJobOpportunityController } from "../controllers/JobOpportunity.js"
import { verifyUser } from "../utils/verifyUser.js"

router.get('/singleJobOpportunity/:id',verifyUser ,getSingleJobOpportunityController)
router.get('/allJobOpportunities',getAllJobOpportunitiesController)
router.post('/createJobOpportunity',verifyUser, createJobOpportunityController)
router.put('/updateJobOpportunity/:id',verifyUser, updateJobOpportunityController)
router.delete('/deleteJobOpportunity/:id',verifyUser, deleteJobOpportunityController)
router.delete('/deleteJobOpportunityByEmployer/:employerId',verifyUser, deleteJobOpportunityByEmployerIDController)


export default router