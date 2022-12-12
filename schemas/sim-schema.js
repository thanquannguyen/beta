const mongoose = require('mongoose')

const simSchema = new mongoose.Schema({
    _id: String,
    ChannelID: String, 
})

module.exports = mongoose.model('sims', simSchema)