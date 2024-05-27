import { Admin } from "../models/Admin.js";
import { setAuthCookie } from "./Auth.js";

export const getAllAdminsService = () => Admin.find({})

export const getSingleAdminService = (id) => Admin.findOne({ _id: id })


export const createAdminService = (form) => new Admin(form)


export const deleteAdminService = (id) => Admin.findOneAndDelete({ _id: id })

export const getSingleAdminByNameService = (name) => Admin.findOne({ username: name })