import { Technologies } from "../models/Technologies.js";

export const getAllTechnologiesService = () => Technologies.find({})

export const getTechnologiesByListOfIDsService = (idsList) => Technologies.find({ _id: { $in: idsList } })

export const createTechnologyService = (form) => new Technologies(form)

export const deleteTechnologyService = (id) => Technologies.findOneAndDelete({ _id: id });

