import { JobSeeker } from "../models/JobSeeker";

export const getAllJobSeekersService = () => JobSeeker.find({})

export const getSingleJobSeekerService = (id) => JobSeeker.findOne({ _id: id })

export const registerJobSeekerService=(form)=>new JobSeeker(form)

export const deleteJobSeekerService=(id)=>JobSeeker.findOneAndDelete({ _id: id})