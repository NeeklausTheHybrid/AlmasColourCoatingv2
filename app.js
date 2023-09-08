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
            process.env.DB_CONNECTION || "mongodb://127.0.0.1:27017/almasWebsite",
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

// Define a route for the homepage
app.get('/', (req, res) => {
    const images = ['resources/img2.jpg', 'resources/img3.jpg', 'resources/img4.jpg'];
    res.render('index', { images, cssName: "index" });
});
app.get("/downloadList", (req, res)=>{
    res.download("public/resources/List_of_projects.pdf");
})
// Define a dynamic route based on the name parameter
app.get("/:name", (req, res) => {
    const templateName = req.params.name;
    res.render(templateName, { cssName: templateName });
});

