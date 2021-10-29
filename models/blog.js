const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    imgPath: {
        type: String,
        required: true,
    },
    description : {
        type : String,
        required : true,
    },
    tags : {
        type: String,
        required: true,
    },
    body : {
        type : String,
        required : true,
    }, 
    likeCount: {
        type: Number,
        default: 0,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;