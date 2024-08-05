const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const cityRouter = require('./routes/CityRoute') 

const app = express()

dotEnv.config()
app.use(cors({
    origin: 'https://weather-data-live.netlify.app'
}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB connected succesfully')
})
.catch((err)=>{
    console.log('Error: ', err)
})

app.use('/weather', cityRouter)
app.get('/check-app', (req, res)=>{
    res.send("app is working")
})

app.listen(PORT, ()=>{
    console.log(`Server is started and running at PORT: ${PORT}`)
})