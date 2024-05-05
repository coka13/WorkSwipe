import { getSingleEmployerService } from "../services/Employer.js"
import { getSingleJobSeekerService } from "../services/JobSeeker.js"
import { getAllMatchesByEmployerIdService, getAllMatchesByJobSeekerIdService, getAllMatchesByJobOpportunityIdService,  createMatchService, deleteMatchService, getSingleMatchService } from "../services/Match.js"

export const getAllMatchesByEmployerIdController = async (req, res) => {
    try {
        const employerId = req.params.employerId
        const employer = await getSingleEmployerService(employerId)
        if (!employer) {
            return serverResponse(res, 404, { message: "employer not found" })
        }
        const isDeprecated = req.query.isDeprecated ? true : false
        const allMatchesByEmployerId = await getAllMatchesByEmployerIdService(employerId, isDeprecated)
        if (allMatchesByEmployerId.length === 0 || !allMatchesByEmployerId) {
            return serverResponse(res, 204, { message: "no match found" })

        }
        return serverResponse(res, 200, allMatchesByEmployerId)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })

    }
}

export const getAllMatchesByJobSeekerIdController = async (req, res) => {
    try {
        const jobSeekerId = req.params.jobSeekerId
        const jobSeeker = await getSingleJobSeekerService(jobSeekerId)
        if (!jobSeeker) {
            return serverResponse(res, 404, { message: "jobSeeker not found" })
        }
        const isDeprecated = req.query.isDeprecated ? true : false
        const allMatchesByJobSeekerId = await getAllMatchesByJobSeekerIdService(jobSeekerId, isDeprecated)
        if (allMatchesByJobSeekerId.length === 0 || !allMatchesByJobSeekerId) {
            return serverResponse(res, 204, { message: "no match found" })

        }
        return serverResponse(res, 200, allMatchesByJobSeekerId)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })

    }

}

export const getAllMatchesByJobOpportunityIdController = async (req, res) => {
    try {
        const jobOpportunityId = req.params.jobOpportunityId
        const jobOpportunity = await getSingleJobOpportunityService(jobOpportunityId)
        if (!jobOpportunity) {
            return serverResponse(res, 404, { message: "job Opportunity not found" })
        }
        const isDeprecated = req.query.isDeprecated ? true : false
        const allMatchesByJobOpportunityId = await getAllMatchesByJobOpportunityIdService(jobOpportunityId, isDeprecated)
        if (allMatchesByJobOpportunityId.length === 0 || !allMatchesByJobOpportunityId) {
            return serverResponse(res, 204, { message: "no match found" })
        }
        return serverResponse(res, 200, allMatchesByJobOpportunityId)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}

export const updateMatchController = async (req, res) => {
    const matchAllowedUpdates = ["isDeprecated"]
    const updates = Object.keys(req.body)
    const isValidOperation = match.every((update) =>
        matchAllowedUpdates.includes(update))
    if (!isValidOperation) {
        return serverResponse(res, 404, { message: "no match found" })
    }

    try {
        const id = req.params.id;
        const match = await getSingleMatchService(id)

        if (!match) {
            return serverResponse(res, 404, { message: "no match found" })
        }

        updates.forEach((update) => (match[update] = req.body[update]));
        await match.save();
        return serverResponse(res, 200, match)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message });
    }
}

export const createMatchController = async (req, res) => {
    try {
        const employerId = req.params.employerId
        const employer = await getSingleEmployerService(employerId)
        if (!employer) {
            return serverResponse(res, 404, { message: "employer not found" })
        }
        const jobSeekerId = req.params.jobSeekerId
        const jobSeeker = await getSingleJobSeekerService(jobSeekerId)
        if (!jobSeeker) {
            return serverResponse(res, 404, { message: "jobSeeker not found" })
        }
        const jobOpportunityId = req.params.jobOpportunityId
        const jobOpportunity = await getSingleJobOpportunityByEmployerIDService(jobOpportunityId , employerId)
        if (!jobOpportunity) {
            return serverResponse(res, 404, { message: "job Opportunity not found" })
        }
        
        const matchObject= {employer , jobSeeker , jobOpportunity}
        const match =  createMatchService(matchObject)
        await match.save()
        if (match.length === 0 || !match) {
            return serverResponse(res, 204, { message: "no match created" })
        }

        return serverResponse(res, 200, match)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}

export const deleteMatchController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMatch = await deleteMatchService(id);
        if (!deletedMatch) {
            return serverResponse(res, 404, { message: "Match not found" })
        }
        return serverResponse(res, 200, deletedMatch)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}