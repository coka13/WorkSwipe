import { JobOpportunity } from "../models/JobOpportunity.js"

export const getAllJobOpportunitiesService = () => JobOpportunity.find({})

export const getSingleJobOpportunityService = (id) => JobOpportunity.findOne({ _id: id })

export const getSingleJobOpportunityByEmployerIDService = (jobOpportuinityId,employerId) => JobOpportunity.findOne({ _id: jobOpportuinityId, employer: employerId })

export const createJobOpportunityService = (form) => new JobOpportunity(form)

export const deleteJobOpportunityService = (id) => JobOpportunity.findOneAndDelete({ _id: id })

export const deleteJobOpportunitiesByEmployerIDService = (employerId) => JobOpportunity.deleteMany({ _id: employerId })

// getoppbyfilterservice