const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    ratings: {
        type: Number,
        required: true,
    }, 
    phoneNumber: {
        type:String,
    },
    review: {
        type: String, 
        required:true
    },
});

const customerReviews = mongoose.model("customer-review", reviewSchema);

module.exports = customerReviews;
