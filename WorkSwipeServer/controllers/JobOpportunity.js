
import { createJobOpportunityService, deleteJobOpportunityService, getAllJobOpportunitiesService, getSingleJobOpportunityService } from "../services/JobOpportunity.js"

export const getAllJobOpportunitiesController = async (req, res) => {
    try {
        const allJobOpportunities = await getAllJobOpportunitiesService()
        if (allJobOpportunities.length === 0 || !allJobOpportunities) {
            return res.status(204).send({ message: "no Job Opportunity found" })

        }
        return res.status(200).send(allJobOpportunities)
    } catch (e) {
        return res.status(500).send({ message: e.message })

    }

}

export const getSingleJobOpportunityController = async (req, res) => {
    try {
        const id = req.params.id
        const jobOpportunity = await getSingleJobOpportunityService(id)
        if (!jobOpportunity) {
            return res.status(404).send({ message: "no jobOpportunity found" })
        }
        return res.status(200).send(jobOpportunity)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
}


export const createJobOpportunityController = async (req, res) => {
    try {

        const jobOpportunityForm = { ...req.body }
        const jobOpportunity = createJobOpportunityService(jobOpportunityForm)
        await jobOpportunity.save()
        res.status(200).send(jobOpportunity)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }

}

export const updateJobOpportunityController = async (req, res) => {
    const jobOpportunityAllowedUpdates = [" expirience","position","technologies", "location","emailHR","website","isActive",""]
    const updates = Object.keys(req.body)
    const isValidOperation = JobOpportunity.every((update) =>
    jobOpportunityAllowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ message: "invalid updates" })
    }

    try {
        const id = req.params.id;
        const jobOpportunity = await getSingleJobOpportunityService(id)

        if (!jobOpportunity) {
            return res.status(404).send({ message: "Job Opportunity does not exist" });
        }

        updates.forEach((update) => (jobOpportunity[update] = req.body[update]));
        await jobOpportunity.save();
        return res.status(200).send(jobOpportunity);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
}

export const deleteJobOpportunityController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedJobOpportunity = await deleteJobOpportunityService(id);
        if (!deletedJobOpportunity) {
            return res.status(404).send({ message: "no JobOpportunity found" });
        }
        return res.status(200).send(deletedJobOpportunity);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
}