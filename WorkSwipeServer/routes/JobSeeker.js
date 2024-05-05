import express from "express"
const router = express.Router()

import { createJobSeekerController, deleteJobSeekerController, getAllJobSeekersController, getSingleJobSeekerController, jobSeekerLoginController, updateJobSeekerController } from "../controllers/JobSeeker.js"

router.get('/api/jobSeekerLogin', jobSeekerLoginController)
router.get('/api/singleJobSeeker/:id', getSingleJobSeekerController)
router.get('/api/allJobSeekers', getAllJobSeekersController)
router.post('/api/createJobSeeker', createJobSeekerController)
router.put('/api/updateJobSeeker/:id', updateJobSeekerController)
router.delete('/api/deleteJobSeeker/:id', deleteJobSeekerController)



export default router