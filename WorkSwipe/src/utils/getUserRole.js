export const getUserRole = (user) => {
if(user.isEmployer===true){
    return "Employer"
}
else if (user.isAdmin===true){
    return "Admin"
}
else{
    return "JobSeeker"
}
}