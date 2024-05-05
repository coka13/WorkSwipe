
import { createAdminService, deleteAdminService, getAllAdminsService, getSingleAdminByNameService, getSingleAdminService } from "../services/Admin.js"
import { compareHashedPassword } from "../utils/compareHashedPassword.js"
import { hashPassword } from "../utils/passwordHashing.js"
import { serverResponse } from "../utils/serverResponse.js"

export const getAllAdminsController = async (req, res) => {
    try {
        const allAdmins = await getAllAdminsService()
        if (allAdmins.length === 0 || !allAdmins) {
            return serverResponse(res, 204, { message: "no admin found" })

        }
        return serverResponse(res, 200, allAdmins)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })

    }
}

export const getSingleAdminController = async (req, res) => {
    try {
        const id = req.params.id
        const admin = await getSingleAdminService(id)
        if (!admin) {
            return serverResponse(res, 404, { message: "no admin found" })
        }
        return serverResponse(res, 200, admin)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}


export const createAdminController = async (req, res) => {
    try {

        const adminForm = { ...req.body }
        adminForm["password"] = hashPassword(req.body.password)
        const admin = createAdminService(adminForm)
        await admin.save()
        return serverResponse(res, 200, admin)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }

}

export const updateAdminController = async (req, res) => {

    const adminPasswordUpdate = ["password"]
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) =>
        adminPasswordUpdate.includes(update))
    if (!isValidOperation) {
        return serverResponse(res, 400, { message: "password invalid" })
    }

    try {
        const id = req.params.id;
        const admin = await getSingleAdminService(id)
        if (!admin) {
            return serverResponse(res, 404, { message: "admin not found" })
        }
        admin["password"] = hashPassword(req.body.password)
        updates.forEach((update) => (admin[update] = req.body[update]));
        await admin.save();
        return serverResponse(res, 200, admin)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}

export const deleteAdminController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAdmin = await deleteAdminService(id);
        if (!deletedAdmin) {
            return serverResponse(res, 404, { message: "admin not found" })
        }
        return serverResponse(res, 200, deletedAdmin)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}

export const adminLoginController = async (req, res) => {
    try {
        const loginForm = { ...req.body }
        const admin = await getSingleAdminByNameService(loginForm.name)
        if (!admin) { return serverResponse(res, 404, { message: "userName or password incorrect" }) }
        const isValidPassword = compareHashedPassword(loginForm.password, admin.password)
        if (!isValidPassword) {
            return serverResponse(res, 404, { message: "userName or password incorrect" })
        }
        return serverResponse(res, 200, admin)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}