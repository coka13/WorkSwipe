import dotenv from 'dotenv'
dotenv.config({})
export const PORT = process.env.PORT || 3000 ;

export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASS = process.env.DB_PASS
export const DB_CLUSTER = process.env.DB_CLUSTER
export const DB_NAME = process.env.DB_NAME

export let connectionString= ``
if(!DB_USERNAME || !DB_PASS ||!DB_CLUSTER ||!DB_NAME){
    connectionString=`mongodb://localhost:27017/WorkSwipeLocal`
}
 connectionString=`mongodb+srv://${DB_USERNAME}:${DB_PASS}@${DB_CLUSTER}/${DB_NAME}`