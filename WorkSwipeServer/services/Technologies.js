import { Technologies } from "../models/Technologies";

export const getAllTechnologiesService = () => Technologies.find({})

export const getTechnologiesByListOfIDsService = (idsList) => Technologies.find({ _id: { $in: idsList } })

export const createTechnologiesService = (form) => new Technologies(form)

export const deleteTechnologiesService = (id) => Technologies.findOneAndDelete({ _id: id });

