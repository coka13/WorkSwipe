import express from "express"
import mongoose from "mongoose"
//import { dirname } from "path";
//import { fileURLToPath } from "url";

import cors from "cors"
//import { DB_CLUSTER, DB_NAME, DB_PASS, DB_USERNAME, port } from "./config/config.js";

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);



const app = express()
app.use(express.json())

app.use(cors())
//app.use(express.static("Client/dist")) //still not used






//app.get("*", (req, res) => {
    //console.log(__dirname);
    //res.sendFile(__dirname + "/Client/dist/index.html");//still not used
  //});
app.listen(3000, async () => {
    try {
      //await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASS}@${DB_CLUSTER}/${DB_NAME}`);
      console.log(`Example app listening on port 3000`);
    } catch (e) {
      console.log(e);
    }
  });
