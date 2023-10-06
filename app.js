const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server 
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Function to connect to the MongoDB database

const mongooseConnectDB = async () => {
    try {
        await mongoose.connect(
            process.env.DB_CONNECTION,
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



mongooseConnectDB();

const customerReviews = require('./models/reviewModel');
const generalInfo = require("./models/generalInfoModel");
const projects = require("./models/projectModel");

const ratingTocomment = {
    1: "Pathetic",
    2: "Not Good",
    3: "Decent",
    4: "Good",
    5: "Awesome"
}

app.get('/', async (req, res) => {
    const images = ['resources/sliderImg1.jpg', 'resources/sliderImg2.jpg', 'resources/sliderImg3.png', 'resources/sliderImg4.png'];
    try {
        const reviews = await customerReviews.find({});
        reviews.reverse();
        res.render('index', {
            images,
            cssName: "index",
            activePage: "Home",
            reviews,
            ratingTocomment
        });
    } catch (error) {
        console.error("Failed", error);
    }
});




app.get("/projects", async (req, res) => {
    try {
        const topProjects = await projects.find({ projectType: "Top" }).exec();
        const otherProjects = await projects.find({ projectType: "Other" }).exec();

        res.render("projects", { topProjects, otherProjects, cssName:"projects", activePage:"projects" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/downloadList", (req, res) => {
    res.download("public/resources/List_of_projects.pdf");
});


app.get("/contact", async (req, res) => {
    
    try {
        const info = await generalInfo.findOne();
        res.render("contact", {
            cssName:"contact",
            contactNumber: info.contact.number,
            contactAddress: info.contact.address,
            contactAddressLink: info.contact.addresslink,
            contactEmail: info.contact.email,
            
        });
    }
    catch (error) {
        console.error("Error querying general info:", error);
        res.status(500).send("Error querying general info");
    }
});


app.get("/about", async (req, res) => {
    try {
        const info = await generalInfo.findOne();
        res.render("about", {
            aboutSection: info.aboutSection,
            cssName: "about",
            activePage: "about",
        });
    }
    catch (error) {
        console.error("Error querying general info:", error);
        res.status(500).send("Error querying general info");
    }
});

app.get("/services", async (req, res) => {
    try {
        const info = await generalInfo.findOne();
        res.render("services", {
            sandBlasting: info.services.sandblasting,
            painting: info.services.painting,
            metalizing: info.services.metalizing,
            cssName: "services",
            activePage: "services",
        });
    }
    catch (error) {
        console.error("Error querying general info:", error);
        res.status(500).send("Error querying general info");
    }
});

// review posting

app.post('/', async (req, res) => {
    try {
        const newReview = await customerReviews.create({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            ratings: req.body.rating,
            review: req.body.review
        });
        res.redirect('/');
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).send('Error saving review.');
    }
});

