import { Employer } from "../models/Employer.js" 

export const getAllEmployersService = () => Employer.find({})

export const getSingleEmployerService = (id) => Employer.findOne({ _id: id })

export const registerEmployerService=(form)=>new Employer(form)

export const createEmployerService = (form) => new Employer(form)

export const deleteEmployerService=(id)=>Employer.findOneAndDelete({ _id: id})

export const getSingleEmployerByNameService = (name) => Employer.findOne({ name: name })