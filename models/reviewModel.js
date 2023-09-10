const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Use lowercase 'true' for required field
    },
    ratings: {
        type: Number,
        min: 1,     // Use 'min' and 'max' to specify the range
        max: 5,
    },
    phoneNumber: {
        type: Number,
        // You can add validation or formatting options here if needed
    },
    review: {
        type: String, // 'Text' should be changed to 'String'
        // You can add validation or formatting options here if needed
    },
});

const customerReviews = mongoose.model("customer-review", reviewSchema); // Typo corrected in model name

module.exports = customerReviews; // Corrected 'module.export' to 'module.exports'
