import express from 'express'
import dotenv from 'dotenv'
import furnitureRouter from './routes/mueblesRoutes.js'
dotenv.config()

const HOST = process.env.HOST
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({
        extended: true
    }
))

app.use('/furnitures', furnitureRouter)

app.listen(PORT, HOST, () =>{
    console.log(`Servidor inicializado en http://${HOST}:${PORT}`)
})