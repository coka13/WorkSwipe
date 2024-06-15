
import { deleteJobOpportunitiesByEmployerIDService, createJobOpportunityService, deleteJobOpportunityService, getAllJobOpportunitiesService, getSingleJobOpportunityService } from "../services/JobOpportunity.js"
import { getSingleJobSeekerService } from "../services/JobSeeker.js"
import { serverResponse } from "../utils/serverResponse.js"

export const getAllJobOpportunitiesController = async (req, res) => {
    try {
        const allJobOpportunities = await getAllJobOpportunitiesService()
        if (allJobOpportunities.length === 0 || !allJobOpportunities) {
            return serverResponse(res, 204, { message: "no job Opportunity found" })

        }
        return serverResponse(res, 200, allJobOpportunities)
    } catch (e) {
        return serverResponse(res, 500, {message: e.message})
    }

}

export const getAllJobOpportunitiesForJobSeeker = async (req , res) => {
    try{
        const id = req.params.id;
        const jobSeeker = await getSingleJobSeekerService(id)
        if(!jobSeeker){
            return serverResponse(res, 404, {message: "no job seeker found"})
        }
        const allSwipedJobsForSpecificJobSeeker = getAllSwipedJobOpportunitiesIds(id)
        const ids = allSwipedJobsForSpecificJobSeeker.map((swipe)=>swipe.jobOpportunity)
        const allJobs = await getAllJobOpportunitiesService(ids)
        return serverResponse(res, 200, allJobs)
    } catch (e) {
        return serverResponse(res, 500, {message: e.message})}
}


export const getSingleJobOpportunityController = async (req, res) => {
    try {
        const id = req.params.id
        const jobOpportunity = await getSingleJobOpportunityService(id)
        if (!jobOpportunity) {
            return serverResponse(res, 404, { message: "no job Opportunity found" })
        }
        return serverResponse(res, 200, jobOpportunity)
    } catch (e) {
        return serverResponse(res, 500, {message: e.message})
    }
}


export const createJobOpportunityController = async (req, res) => {
    try {

        const jobOpportunityForm = { ...req.body }
        const jobOpportunity = createJobOpportunityService(jobOpportunityForm)
        await jobOpportunity.save()
        serverResponse(res, 200, jobOpportunity)
    } catch (e) {
        return serverResponse(res, 500, {message: e.message})
    }

}

export const updateJobOpportunityController = async (req, res) => {
    const jobOpportunityAllowedUpdates = [" expirience", "position", "technologies", "location", "emailHR", "website", "isActive", ""]
    const updates = Object.keys(req.body)
    const isValidOperation = JobOpportunity.every((update) =>
        jobOpportunityAllowedUpdates.includes(update))
    if (!isValidOperation) {
        return serverResponse(res, 400, { message: "no job Opportunity found" })
    }

    try {
        const id = req.params.id;
        const jobOpportunity = await getSingleJobOpportunityService(id)

        if (!jobOpportunity) {
            return serverResponse(res, 404, { message: "no job Opportunity not found" })
        }

        updates.forEach((update) => (jobOpportunity[update] = req.body[update]));
        await jobOpportunity.save();
        return serverResponse(res, 200, jobOpportunity)
    } catch (e) {
        return serverResponse(res, 500, {message: e.message})
    }
}

export const deleteJobOpportunityController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedJobOpportunity = await deleteJobOpportunityService(id);
        if (!deletedJobOpportunity) {
            return serverResponse(res, 404, { message: "no job Opportunity found" })
        }
        return serverResponse(res, 200, deletedJobOpportunity)
    } catch (e) {
        return serverResponse(res, 500, {message: e.message})
    }
}

export const deleteJobOpportunityByEmployerIDController = async (req, res) => {
    try {
        const id = req.params.employerId;
        const deletedJobOpportunityByEmployerID = await deleteJobOpportunitiesByEmployerIDService(id);
        if (!deletedJobOpportunityByEmployerID) {
            return res.status(404).send({ message: "no JobOpportunity found" });
        }
        return serverResponse(res, 200, deletedJobOpportunityByEmployerID)
    } catch (e) {
        return serverResponse(res, 500, {message: e.message})
    }
}