
import { createJobSeekerService, deleteJobSeekerService, getAllJobSeekersService, getSingleJobSeekerByNameService, getSingleJobSeekerService } from "../services/JobSeeker.js"
import { serverResponse } from "../utils/serverResponse.js"
import { hashPassword } from "../utils/passwordHashing.js"
import { compareHashedPassword } from "../utils/compareHashedPassword.js"

export const getAllJobSeekersController = async (req, res) => {
    try {
        const allJobSeekers = await getAllJobSeekersService()
        if (allJobSeekers.length === 0 || !allJobSeekers) {
            return serverResponse(res, 204, { message: "no job seeker found" })

        }
        return serverResponse(res, 200, allJobSeekers)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })

    }

}


export const getSingleJobSeekerController = async (req, res) => {
    try {
        const id = req.params.id
        const jobSeeker = await getSingleJobSeekerService(id)
        if (!jobSeeker) {
            return serverResponse(res, 404, { message: "no job seeker found" })
        }
        return serverResponse(res, 200, jobSeeker)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}


export const createJobSeekerController = async (req, res) => {
    try {

        const jobSeekerForm = { ...req.body }
        jobSeekerForm["password"] = hashPassword(req.body.password)
        const jobSeeker = createJobSeekerService(jobSeekerForm)
        const cookieToken = setAuthCookie(`${jobSeekerForm.username} JobSeeker`)
        res.cookie("authorization", cookieToken, {
            httpOnly:true,
            maxAge: 60*60*5
        })
        await jobSeeker.save()
        return serverResponse(res, 200, jobSeeker)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }

}

export const updateJobSeekerController = async (req, res) => {
    const jobSeekerAllowedUpdates = ["technologies", "location", "linkedInUrl", "gitHubUrl"]
    const updates = Object.keys(req.body)
    const isValidOperation = jobSeeker.every((update) =>
        jobSeekerAllowedUpdates.includes(update))
    if (!isValidOperation) {
        return serverResponse(res, 404, { message: "no job seeker found" })
    }

    try {
        const id = req.params.id;
        const jobSeeker = await getSingleJobSeekerService(id)

        if (!jobSeeker) {
            return serverResponse(res, 404, { message: "no job seeker found" })
        }

        updates.forEach(update => jobSeeker[update] = req.body[update]);
        await jobSeeker.save();
        return serverResponse(res, 200, jobSeeker)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message });
    }
}

export const updateJobSeekerPasswordController = async (req, res) => {

    const jobSeekerPasswordUpdate = ["password"]
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) =>
        jobSeekerPasswordUpdate.includes(update))
    if (!isValidOperation) {
        return serverResponse(res, 400, { message: "password invalid" })
    }

    try {
        const id = req.params.id;
        const jobSeeker = await getSingleJobSeekerService(id)
        if (!jobSeeker) {
            return serverResponse(res, 404, { message: "jobSeeker not found" })
        }
        jobSeeker["password"] = hashPassword(req.body.password)
        await jobSeeker.save();
        return serverResponse(res, 200, jobSeeker)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}


export const deleteJobSeekerController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedJobSeeker = await deleteJobSeekerService(id);
        if (!deletedJobSeeker) {
            return serverResponse(res, 404, { message: "jobSeeker not found" })
        }
        return serverResponse(res, 200, deletedJobSeeker)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message });
    }
}

export const jobSeekerLoginController = async (req, res) => {
    try {
        const loginForm = { ...req.body }
        const jobSeeker = await getSingleJobSeekerByNameService(loginForm.username)
        if (!jobSeeker) { return serverResponse(res, 404, { message: "userName or password incorrect" }) }
        const isValidPassword = compareHashedPassword(loginForm.password, jobSeeker.password)
        if (!isValidPassword) {
            return serverResponse(res, 404, { message: "userName or password incorrect" })
        }
        return serverResponse(res, 200, jobSeeker)
    } catch (e) {
        console.log(e)
        return serverResponse(res, 500, { message: e.message })
    }
}
