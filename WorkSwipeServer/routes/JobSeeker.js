import express from "express"
const router = express.Router()

import { createJobSeekerController, deleteJobSeekerController, getAllJobSeekersController, getSingleJobSeekerController, jobSeekerLoginController, updateJobSeekerController } from "../controllers/JobSeeker.js"
import { verifyUser } from "../utils/verifyUser.js"

router.get('/singleJobSeeker/:id',verifyUser, getSingleJobSeekerController)
router.get('/allJobSeekers', verifyUser,getAllJobSeekersController)
router.post('/createJobSeeker', createJobSeekerController)
router.post('/jobSeekerLogin', jobSeekerLoginController)
router.put('/updateJobSeeker/:id',verifyUser, updateJobSeekerController)
router.delete('/deleteJobSeeker/:id', verifyUser, deleteJobSeekerController)



export default router