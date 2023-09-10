const mongoose=require("mongoose");

const projectSchema= new mongoose.Schema({
    name:String,
    description:String,
});

const projects=mongoose.model("our-project", projectSchema);

module.exports=projects;