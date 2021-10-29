
const Blog = require('../models/blog')
const fs = require('fs');

// blog_index
const blog_index = (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then(( result ) => {
            res.render('blogs/index', { title: 'All blogs', blogs: result});    
        })
        .catch((err) => console.log(err));
}

// blog_details
const blog_details = async (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(async (result) => {
            await Blog.updateOne({ _id: id}, {viewCount: result.viewCount+1});
            res.render('blogs/details', { title: 'Blog Details', blog: result }) 
        })
        .catch((err) => {
            res.render('notfound', { title: 'Blog not Found' })
        });
}

// blog_create_get
const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create Blog' });
}

// blog_create_post
const blog_create_post = (req, res) => {
    const blog = new Blog({...req.body, imgPath: "uploads/"+req.file.filename});
    blog.save()
        .then((result) =>{
            res.redirect('/blogs');
        })
        .catch((err) => console.log(err));
}

// blog_delete
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            fs.promises.unlink('./public/'+result.imgPath);
            res.json({redirect : '/blogs'})
        })
        .catch((err) => console.log(err));
}

//blog_like 
const blog_like = async (req, res) => {
    const id = req.params.id;
    try {
        const searched = await Blog.findOne({_id: id});
        await Blog.updateOne({ _id: id}, {likeCount: searched.likeCount+1});
        res.json({redirect : `/blogs/${id}`})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_post,
    blog_delete,
    blog_create_get,
    blog_like,
}