import  jwt from "jsonwebtoken";
import { COOKIE_SECRET } from "../config/config.js";
import { cookieTokenDuration } from "../constants/constants.js";

export const setAuthCookie = (username) => {
    try{
        const created = Date.now();

        const cookieToken = jwt.sign({
            username:username,
            created:created
        },
        COOKIE_SECRET,
        {expiresIn: cookieTokenDuration}
        );
        return cookieToken
    } catch(error){
        console.log(error);
        throw e
    }
}