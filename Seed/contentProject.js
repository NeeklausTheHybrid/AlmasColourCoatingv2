const express = require("express");
const mongoose = require("mongoose");


// connecting the db
const mongooseConnectDB = async () => {
    try {
        await mongoose.connect(
            process.env.DB_CONNECTION || "mongodb+srv://amirkhan011000:38AP1HGD6nB36BCc@cluster1.vgymzih.mongodb.net/AlmasColourCoating?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('DB connected');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1); // Exit the application with a non-zero status code to indicate an error
    }
};



// Connect to MongoDB or calling function

mongooseConnectDB();

// getting project model (project collection)
const projects = require("../models/projectModel");

// getting generalInfo Model


// **************************************************************************************************************************************
// creating data (documents) in projectModel (project collection)

const projectsToInsert = [
    {
        name: "Project 8",
        description: "Description for Project 1"
    },
    {
        name: "Project 9",
        description: "Description for Project 2"
    },
    {
        name: "Project 10",
        description: "Description for Project 3"
    }
];

async function createProjects() {
    try {
        const creation = await projects.insertMany(projectsToInsert);
        console.log("Created", creation);
    }
    catch (err) {
        console.error("error", err)
    }
}

createProjects();


// ************************************************************************************************************************************
// updating data in projectModel (project collection)

async function updatedProject() {
    try {
        const updation = projects.findByIdAndUpdate("xyz", {
            name: "New Name",
            description: "New Description"
        });

        console.log("Updated project:", updatedProject); 

    }
    catch (err) {

        console.error(err);
    }
};

// updatedProject();


// ****************************************************************************************************************************************
// // deleting project data

// projects.findByIdAndDelete("xyz");



