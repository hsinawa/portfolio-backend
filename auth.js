require('dotenv').config();
const mongoose = require('mongoose')
var mongodburl = process.env.MONGODB_URL || ''

mongoose.set('strictQuery', true);
mongoose.connect(mongodburl , { useUnifiedTopology:true , useNewUrlParser:true })

var dbconnect = mongoose.connection

dbconnect.on( 'error' ,()=>{
    console.log('Mogo DB connection failed')
} )

dbconnect.on('connected' , ()=>{
    console.log('connection passed to Awanish Portfolio'  )
} )

mongoose.exports = mongoose