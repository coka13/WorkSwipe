import { JobOpportunity } from "../models/JobOpportunity.js"

export const getAllJobOpportunitiesService = () => JobOpportunity.find({})

export const getAllFilteredJobOpportunitiesService = (filter) => JobOpportunity.find({ _id: { $nin: filter } })

export const getSingleJobOpportunityService = (id) => JobOpportunity.findOne({ _id: id })

export const getSingleJobOpportunityByEmployerIDService = (jobOpportuinityId,employerId) => JobOpportunity.findOne({ _id: jobOpportuinityId, employer: employerId })

export const createJobOpportunityService = (form) => new JobOpportunity(form)

export const deleteJobOpportunityService = (id) => JobOpportunity.findOneAndDelete({ _id: id })

export const deleteJobOpportunitiesByEmployerIDService = (employerId) => JobOpportunity.deleteMany({ employer: employerId })

// getoppbyfilterservice