
import { createAdminService, deleteAdminService, getAllAdminsService, getSingleAdminService } from "../services/Admin"

export const getAllAdminsController = async (req, res) => {
    try {
        const allAdmins = await getAllAdminsService()
        if (allAdmins.length === 0 || !allAdmins) {
            return res.status(204).send({ message: "no Admin found" })

        }
        return res.status(200).send(allAdmins)
    } catch (e) {
        return res.status(500).send({ message: e.message })

    }

}

export const getSingleAdminController = async (req, res) => {
    try {
        const id = req.params.id
        const admin = await getSingleAdminService(id)
        if (!admin) {
            return res.status(404).send({ message: "no admin found" })
        }
        return res.status(200).send(admin)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
}


export const createAdminController = async (req, res) => {
    try {

        const adminForm = { ...req.body }
        const admin = createAdminService(adminForm)
        await admin.save()
        res.status(200).send(admin)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }

}

export const updateAdminController = async (req, res) => {
    const adminAllowedUpdates = ["password"]
    const updates = Object.keys(req.body)
    const isValidOperation = admin.every((update) =>
        adminAllowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ message: "invalid updates" })
    }

    try {
        const id = req.params.id;
        const admin = await getSingleAdminService(id)

        if (!admin) {
            return res.status(404).send({ message: "admin does not exist" });
        }

        updates.forEach((update) => (admin[update] = req.body[update]));
        await admin.save();
        return res.status(200).send(admin);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
}

export const deleteAdminController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAdmin = await deleteAdminService(id);
        if (!deletedAdmin) {
            return res.status(404).send({ message: "no admin found" });
        }
        return res.status(200).send(deletedAdmin);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
}