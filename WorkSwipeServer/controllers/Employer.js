
import { createEmployerService, deleteEmployerService, getAllEmployersService,  getSingleEmployerByNameService, getSingleEmployerService } from "../services/Employer.js"
import { deleteJobOpportunitiesByEmployerIDService } from "../services/JobOpportunity.js"
import { compareHashedPassword } from "../utils/compareHashedPassword.js"
import { hashPassword } from "../utils/passwordHashing.js"
import { serverResponse } from "../utils/serverResponse.js"


export const getAllEmployersController = async (req, res) => {
    try {
        const allEmployers = await getAllEmployersService()
        if (allEmployers.length === 0 || !allEmployers) {
            return serverResponse(res, 204, { message: "no employer found" })

        }
        return serverResponse(res, 200, allEmployers)
    } catch (e) {
        return serverResponse(res, 500, {message:e.message})

    }

}


export const getSingleEmployerController = async (req, res) => {
    try {
        const id = req.params.id
        const employer = await getSingleEmployerService(id)
        if (!employer) {
            return serverResponse(res, 404, { message: "employer not found" })
        }
        return serverResponse(res, 200, employer)
    } catch (e) {
        return serverResponse(res, 500, {message:e.message})
}
}


export const createEmployerController = async (req, res) => {
    try {

        const employerForm = { ...req.body }
        employerForm["password"] = hashPassword(req.body.password)
        const employer = createEmployerService(employerForm)
        const cookieToken = setAuthCookie(`${employerForm.username} Employer`)
        res.cookie("authorization", cookieToken, {
            httpOnly:true,
            maxAge: 60*60*5
        })
        await employer.save()
        serverResponse(res, 200, employer)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }

}

export const updateEmployerController = async (req, res) => {
    const employerAllowedUpdates = ["password"]
    const id = req.params.id;
    const updates = Object.keys(req.body)
    // const employer = await getSingleEmployerService(id)
    const isValidOperation = updates.every((update) =>
    employerAllowedUpdates.includes(update))
    if (!isValidOperation) {
        return serverResponse(res, 400, { message: "invalid updates" })
    }
    
    try {
        const id = req.params.id;
        const employer = await getSingleEmployerService(id)
        if (!employer) {
            return serverResponse(res, 404, { message: "employer not found" })
        }
        employer["password"] = hashPassword(req.body.password)
        await employer.save();
        return serverResponse(res, 200, employer)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}

export const deleteEmployerController = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const deletedEmployer = await Promise.all([deleteJobOpportunitiesByEmployerIDService(id), deleteEmployerService(id)]);
        console.log(deletedEmployer)
        if (!deletedEmployer) {
            return serverResponse(res, 404, { message: "employer not found" })
        }
        return serverResponse(res, 200, deletedEmployer)
    } catch (e) {
        console.log(e.message)
        return serverResponse(res, 500, {message:e.message})
    }
}

export const employerLoginController = async (req, res) => {
    try {
        const loginForm = { ...req.body }
        const employer = await getSingleEmployerByNameService(loginForm.usernamename)
        if (!employer) { return serverResponse(res, 404, { message: "userName or password incorrect" }) }
        const isValidPassword = compareHashedPassword(loginForm.password, employer.password)
        if (!isValidPassword) {
            return serverResponse(res, 404, { message: "userName or password incorrect" })
        }
        return serverResponse(res, 200, employer)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}
