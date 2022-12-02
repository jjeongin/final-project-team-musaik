///Skeleton for access token schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const tokenSchema  = new Schema({

})

const Token = mongoose.model('Token', tokenSchema)

module.exports = {
    Token
}