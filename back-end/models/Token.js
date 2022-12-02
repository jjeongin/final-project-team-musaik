///Skeleton for access token schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const tokenSchema  = new Schema({
    User: {type: String, required: true},

    Access: {type: String, required: true, default:"XXX"},

    Secret: {type: String, required: true, default:"XXX"},

    saveInitiliazing: {type: Boolean, required: true, default:true}



})


const cleintSchema  = new Schema({
    User: {type: String, required: true},

    Access: {type: String, required: true, default:"XXX"},

    Secret: {type: String, required: true, default:"XXX"},

    saveInitiliazing: {type: Boolean, required: true, default:true}



})

const Token = mongoose.model('Token', tokenSchema)

const Client = mongoose.model('Client', cleintSchema)



module.exports = {

    Token,
    Client

}