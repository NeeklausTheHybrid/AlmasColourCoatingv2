const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv=require("dotenv");
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



// Connect to MongoDB or calling function

mongooseConnectDB();
const customerReviews = require('./models/reviewModel');
const generalInfo = require("./models/generalInfoModel");
const projects = require("./models/projectModel");
// Define a route for the homepage
app.get('/', (req, res) => {
    const images = ['resources/sliderImg1.jpg', 'resources/sliderImg2.jpg', 'resources/sliderImg3.png', 'resources/sliderImg4.png'];
    res.render('index', { images, cssName: "index", activePage: "Home" });
});
app.get("/downloadList", (req, res) => {
    res.download("public/resources/List_of_projects.pdf");
})
// Define a dynamic route based on the name parameter
app.get("/:name", async (req, res) => {
    const templateName = req.params.name;

    try {
        // Assuming you want to find a specific document in the "general-info" collection
        const info = await generalInfo.findOne();
        const project=await projects.findOne();

        res.render(templateName, {
            cssName: templateName,
            activePage: templateName,
            contactNumber: info.contact.number,
            contactAddress: info.contact.address,
            contactAddressLink:info.contact.addresslink,
            contactEmail:info.contact.email,
            aboutSection:info.aboutSection,
            sandBlasting: info.services.sandblasting,
            painting: info.services.painting,
            metalizing: info.services.metalizing,
        });
    }

     catch (error) {
        console.error("Error querying general info:", error);
        res.status(500).send("Error querying general info");
    }
});



app.post('/', async (req, res) => {
    try {
        // Validate input data (you may want to add more validation)
        if (!req.body.name || !req.body.ratings || !req.body.review) {
            return res.status(400).send('Name, ratings, and review are required fields.');
        }

        const newReview = new customerReviews ({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            ratings: req.body.ratings,
            review: req.body.review
        });

        await newReview.save();
        res.redirect('/');
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).send('Error saving review.');
    }
});

