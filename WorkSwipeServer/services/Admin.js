import { Admin } from "../models/Admin";

export const getAllAdminsService = () => Admin.find({})

export const getSingleAdminsService = (id) => Admin.findOne({ _id: id })

export const registerAdminService = (form) => new Admin(form)

export const createAdminService = (form) => new Admin(form)

export const deleteAdminService = (id) => Admin.findOneAndDelete({ _id: id })

export const getSingleAdminByNameService = (name) => Admin.findOne({ name: name })