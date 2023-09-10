const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
    aboutSection: String,
    contact: {
        number: Number,  
        email: String,   
        address: String,
        addressLink: String 
    },
    services: {
        sandBlasting: String,
        painting: String,
        metalizing:String
    }
});

const generalInfo = mongoose.model("general-info", infoSchema);

module.exports = generalInfo;
