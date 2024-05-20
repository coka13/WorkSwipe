import { Match } from "../models/Match.js";

export const getAllMatchesByEmployerIdService = (employerId, isDeprecated) => {
    return !isDeprecated ? Match.find({ employer: employerId, isDeprecated: false }) :
        Match.find({ employer: employerId })
}

export const getAllMatchesByJobSeekerIdService = (jobSeekerId, isDeprecated) => {
    return !isDeprecated ? Match.find({ jobSeeker: jobSeekerId, isDeprecated: false }) :
        Match.find({ jobSeeker: jobSeekerId })
}

export const getAllMatchesByJobOpportunityIdService = (jobOpportunityId, isDeprecated) => {
    return !isDeprecated ? Match.find({ jobOpportunity: jobOpportunityId, isDeprecated: false }) :
        Match.find({ jobOpportunity: jobOpportunityId })
}

export const getSingleMatchService = (id) => Match.findOne({ _id: id })

export const createMatchService = (form) => new Match(form)

export const deleteMatchService = (id) => Match.findOneAndDelete({ _id: id })