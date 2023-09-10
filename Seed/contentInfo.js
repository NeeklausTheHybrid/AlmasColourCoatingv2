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
const generalInfo = require("../models/generalInfoModel");


// creation **************************************************************************************************************************
async function createInfo() {
    try {
        const creation = await generalInfo.create({
            aboutSection: String,
            contact: {
                number: 250,
                email: " yo yo",
                address: "Pakistan",
                addressLink: "shiznk"
            },
            services: {
                sandBlasting: "dc",
                painting: "dcd",
                metalizing:"dmncdn"
            }
        });
        
        console.log("Creation Successfull", generalInfo);

    }
    catch (err) {
        console.error("Creation Failed", err);
    }
};

createInfo();



