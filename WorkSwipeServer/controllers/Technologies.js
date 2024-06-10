
import {
    createTechnologyService, getAllTechnologiesService,
    deleteTechnologyService,
    getTechnologiesByListOfIDsService
} from "../services/Technologies.js"
import {serverResponse} from "../utils/serverResponse.js"

export const getAllTechnologiesController = async (req, res) => {

    try {
        const allTechnologies = await getAllTechnologiesService()
        if (allTechnologies.length === 0 || !allTechnologies) {
            return serverResponse(res, 204, { message: "technology not found" })

        }
        return serverResponse(res, 200, allTechnologies)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })

    }
}




export const createTechnologyController = async (req, res) => {
    try {

        const technologyForm = { ...req.body }
        const technology = createTechnologyService(technologyForm)
        await technology.save()
        serverResponse(res, 200, technology)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }

}



export const deleteTechnologyController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTechnology = await deleteTechnologyService(id);
        if (!deletedTechnology) {
            return serverResponse(res, 404, { message: "technology not found" })
        }
        return serverResponse(res, 200, deletedTechnology)
    } catch (e) {
        return serverResponse(res, 500, { message: e.message })
    }
}

export const getTechnologiesByListOfIDsController = async (req, res) => {
    console.log("req",req.body)
  try {
    const results = {};

    for (const key in req.body) {
      const idsList = req.body[key];
      const technologies = await getTechnologiesByListOfIDsService(idsList);
      results[key] = technologies;
    }

    if (Object.values(results).every(arr => arr.length === 0)) {
      return serverResponse(res, 204, { message: "technology not found" });
    }

    return serverResponse(res, 200, results);
  } catch (e) {
    return serverResponse(res, 500, { message: e.message });
  }
};