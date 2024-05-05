import express from "express"
const router = express.Router()

import { createJobOpportunityController, deleteJobOpportunityByEmployerIDController, deleteJobOpportunityController, getAllJobOpportunitiesController, getSingleJobOpportunityController, updateJobOpportunityController } from "../controllers/JobOpportunity.js"

router.get('/api/singleJobOpportunity/:id', getSingleJobOpportunityController)
router.get('/api/allJobOpportunities', getAllJobOpportunitiesController)
router.post('/api/createJobOpportunity', createJobOpportunityController)
router.put('/api/updateJobOpportunity/:id', updateJobOpportunityController)
router.delete('/api/deleteJobOpportunity/:id', deleteJobOpportunityController)
router.delete('/api/deleteJobOpportunityByEmployer/:employerId', deleteJobOpportunityByEmployerIDController)


export default router