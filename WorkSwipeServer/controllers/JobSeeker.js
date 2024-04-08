
import { createJobSeekerService, deleteJobSeekerService, getAllJobSeekersService, getSingleJobSeekerService } from "../services/JobSeeker.js"

export const getAllJobSeekersController = async (req, res) => {
    try {
        const allJobSeekers = await getAllJobSeekersService()
        if (allJobSeekers.length === 0 || !JobSeekers) {
            return res.status(204).send({ message: "no Job Seeker found" })

        }
        return res.status(200).send(JobSeekers)
    } catch (e) {
        return res.status(500).send({ message: e.message })

    }

}


export const getSingleJobSeekerController = async (req, res) => {
    try {
        const id = req.params.id
        const jobSeeker = await getSingleJobSeekerService(id)
        if (!jobSeeker) {
            return res.status(404).send({ message: "no job Seeker found" })
        }
        return res.status(200).send(jobSeeker)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
}


export const createJobSeekerController = async (req, res) => {
    try {

        const jobSeekerForm = { ...req.body }
        const jobSeeker = createJobSeekerService(jobSeekerForm)
        await jobSeeker.save()
        res.status(200).send(jobSeeker)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }

}

export const updateJobSeekerController = async (req, res) => {
    const jobSeekerAllowedUpdates = ["password", "technologies", "location" , "linkedInUrl", "gitHubUrl"]
    const updates = Object.keys(req.body)
    const isValidOperation = jobSeeker.every((update) =>
    jobSeekerAllowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ message: "invalid updates" })
    }

    try {
        const id = req.params.id;
        const jobSeeker = await getSingleJobSeekerService(id)

        if (!jobSeeker) {
            return res.status(404).send({ message: "job seeker does not exist" });
        }

        updates.forEach((update) => (jobSeeker[update] = req.body[update]));
        await jobSeeker.save();
        return res.status(200).send(jobSeeker);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
}

export const deleteJobSeekerController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedJobSeeker = await deleteJobSeekerService(id);
        if (!deletedJobSeeker) {
            return res.status(404).send({ message: "no Job Seeker found" });
        }
        return res.status(200).send(deletedJobSeeker);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
}