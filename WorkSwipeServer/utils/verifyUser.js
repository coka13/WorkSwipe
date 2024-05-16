import jwt from 'jsonwebtoken'
import { COOKIE_SECRET } from '../config/config.js'
import { serverResponse } from './serverResponse.js'
import { cookieTokenDuration } from '../constants/constants.js'


export const verifyUser = async (req,res,next) => {
    try{
        if(req.cookies.token) {
            const decoded = jwt.verify(req.cookies.token, COOKIE_SECRET)
            if(Date.now() - new Date(decoded.created) < cookieTokenDuration*1000){
                req.user = decoded
                next();
            } else{
                res.clearCookie(req.cookies.token)
                throw new Error("token lifetime is dead")
            }
        } else{
            throw new Error("Invalid Token")
        }
    } catch(error){
        return serverResponse(res, 401, {message: "You are not authorized"})
    }
}