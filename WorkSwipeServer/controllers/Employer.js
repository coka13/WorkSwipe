
import { createEmployerService, deleteEmployerService, getAllEmployersService, getSingleEmployerService } from "../services/Employer"

export const getAllEmployersController = async (req, res) => {
    try {
        const allEmployers = await getAllEmployersService()
        if (allEmployers.length === 0 || !allEmployers) {
            return res.status(204).send({ message: "no employer found" })

        }
        return res.status(200).send(allEmployers)
    } catch (e) {
        return res.status(500).send({ message: e.message })

    }

}


export const getSingleEmployerController = async (req, res) => {
    try {
        const id = req.params.id
        const employer = await getSingleEmployerService(id)
        if (!employer) {
            return res.status(404).send({ message: "no employer found" })
        }
        return res.status(200).send(employer)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
}


export const createEmployerController = async (req, res) => {
    try {

        const employerForm = { ...req.body }
        const employer = createEmployerService(employerForm)
        await employer.save()
        res.status(200).send(employer)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }

}

export const updateEmployerController = async (req, res) => {
    const employerAllowedUpdates = ["password"]//האם גם חברה ?
    const updates = Object.keys(req.body)
    const isValidOperation = employer.every((update) =>
        employerAllowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ message: "invalid updates" })
    }

    try {
        const id = req.params.id;
        const employer = await getSingleEmployerService(id)

        if (!employer) {
            return res.status(404).send({ message: "employer does not exist" });
        }

        updates.forEach((update) => (employer[update] = req.body[update]));
        await employer.save();
        return res.status(200).send(employer);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
}

export const deleteEmployerController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEmployer = await deleteEmployerService(id);
        if (!deletedEmployer) {
            return res.status(404).send({ message: "no employer found" });
        }
        return res.status(200).send(deletedEmployer);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
}