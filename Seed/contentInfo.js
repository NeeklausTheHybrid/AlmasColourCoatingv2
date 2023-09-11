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
                number: "+91 9760887400",
                email: " azadk522@gmail.com",
                address: "F-99 Almas House, Near Shri Guru Nanank Degree College, Rudrapur-263153, Uttarakhand",
                addresslink: "https://www.google.com/maps/place/28%C2%B057'19.5%22N+79%C2%B023'45.6%22E/@28.9554104,79.3953567,19z/data=!3m1!4b1!4m4!3m3!8m2!3d28.9554092!4d79.3960018?entry=ttu"
            },
            services: {
                sandblasting: "dc",
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



