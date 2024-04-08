
import { createTechnologyService,getAllTechnologiesService, getSingleTechnologyService,
    deleteTechnologyService } from "../services/Technologies.js"

export const getAllTechnologiesController = async (req, res) => {
    try {
        const allTechnologies = await getAllTechnologiesService()
        if (allTechnologies.length === 0 || !allTechnologies) {
            return res.status(204).send({ message: "no Technology found" })

        }
        return res.status(200).send(allTechnologies)
    } catch (e) {
        return res.status(500).send({ message: e.message })

    }

}


export const getSingleTechnologyController = async (req, res) => {
    try {
        const id = req.params.id
        const technology = await getSingleTechnologyService(id)
        if (!technology) {
            return res.status(404).send({ message: "no technology found" })
        }
        return res.status(200).send(technology)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
}


export const createTechnologyController = async (req, res) => {
    try {

        const technologyForm = { ...req.body }
        const technology = createTechnologyService(technologyForm)
        await technology.save()
        res.status(200).send(technology)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }

}





//update

// export const deleteTechnologyController = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const deletedTechnology = await deleteTechnologyService(id);
//         if (!deletedTechnology) {
//             return res.status(404).send({ message: "no technology found" });
//         }
//         return res.status(200).send(deletedTechnology);
//     } catch (e) {
//         return res.status(500).send({ message: e.message });
//     }
// }