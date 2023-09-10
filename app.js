const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");


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
const customerReviews = require('./models/reviewModel');

// Define a route for the homepage
app.get('/', (req, res) => {
    const images = ['resources/sliderImg1.jpg', 'resources/sliderImg2.jpg', 'resources/sliderImg3.png', 'resources/sliderImg4.png'];
    res.render('index', { images, cssName: "index", activePage: "Home" });
});
app.get("/downloadList", (req, res) => {
    res.download("public/resources/List_of_projects.pdf");
})
// Define a dynamic route based on the name parameter
app.get("/:name", (req, res) => {
    const templateName = req.params.name;
    res.render(templateName, { cssName: templateName, activePage: templateName });
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

