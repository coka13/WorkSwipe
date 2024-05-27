import { JobSeeker } from "../models/JobSeeker.js";

export const getAllJobSeekersService = () => JobSeeker.find({})

export const getSingleJobSeekerService = (id) => JobSeeker.findOne({ _id: id })

export const createJobSeekerService = (form) => new JobSeeker(form)

export const deleteJobSeekerService=(id)=>JobSeeker.findOneAndDelete({ _id: id})

export const getSingleJobSeekerByNameService = (username) => JobSeeker.findOne({ username: username })