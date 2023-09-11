const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
    aboutSection: String,
    contact: {
        number: String,  
        email: String,   
        address: String,
        addresslink: String 
    },
    services: {
        sandblasting: String,
        painting: String,
        metalizing:String
    }
});

const generalInfo = mongoose.model("general-info", infoSchema);

module.exports = generalInfo;
