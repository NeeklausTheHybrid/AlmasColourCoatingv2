


const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    projectType: {
        type: String,
        default: "Other", // Default value is "Other"
    },
});

const projects = mongoose.model("our-project", projectSchema);


module.exports = projects;