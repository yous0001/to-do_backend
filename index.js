import express from "express"
import { config } from "dotenv"
import { db_connection } from "./DB/connection.js"
import userRouter from "./SRC/modules/User/user.routes.js"
import noteRouter from "./SRC/modules/Note/note.routes.js"
import bodyParser from "body-parser"
import { globalResponce } from "./SRC/middlewares/errorHandler.middleware.js"
import { uploadTest } from "./SRC/utils/cloudinary.utils.js"

config()
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
db_connection()

app.use('/user',userRouter)
app.use('/note',noteRouter)
app.use(globalResponce)
app.get('/test-upload',uploadTest)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})