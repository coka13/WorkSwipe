import express from "express"
const router = express.Router()

import { createJobSeekerController, deleteJobSeekerController, getAllJobSeekersController, getSingleJobSeekerController, jobSeekerLoginController, updateJobSeekerController, updateJobSeekerPasswordController } from "../controllers/JobSeeker.js"
import { verifyUser } from "../utils/verifyUser.js"

router.get('/singleJobSeeker/:id',verifyUser, getSingleJobSeekerController)
router.get('/allJobSeekers', verifyUser,getAllJobSeekersController)
router.post('/createJobSeeker', createJobSeekerController)
router.post('/jobSeekerLogin', jobSeekerLoginController)
router.put('/updateJobSeeker/:id', updateJobSeekerController)
router.put('/updateJobSeekerPassword/:id', updateJobSeekerPasswordController)
router.delete('/deleteJobSeeker/:id', verifyUser, deleteJobSeekerController)



export default router