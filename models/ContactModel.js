const mongoose = require('mongoose')


const BookingSchema = mongoose.Schema({
    
    name:{
        type:String ,
        require
    } ,
    message:{
        type:String ,
        require
    } ,
    email:{
        type:String ,
        require
    }

} , {
    timestamps:true
} )

const Booking = mongoose.model('Booking' , BookingSchema )
module.exports = Booking