import bcrypt from "bcryptjs"

export const compareHashedPassword= (passwordFormLogin , passwordFromDB)=>{
    console.log(passwordFormLogin,passwordFromDB)
return bcrypt.compareSync(passwordFormLogin , passwordFromDB)
}