export const compareHashedPassword= (passwordFormLogin , passwordFromDB)=>{
return bcrypt.compareSync(passwordFormLogin , passwordFromDB)
}