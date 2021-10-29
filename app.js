const express = require('express');
const mongoose = require('mongoose');

// creating express app...router...
const app = express();
const PORT = 5000;

//connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/blogDB';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("MongoDB Database Connected."))
    .catch((err) => console.log(err));

// Provinding View Engine 
app.set('view engine','ejs');

// For Static Public Files and url encoding 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// All blogs route
app.use('/blogs', require('./routes/blogRoutes'));

// About page route
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Non-existing blogs routes
app.use((req, res) => {
    res.status(404).render('notfound', { title: '404' });
});

// Listen for requests
app.listen(PORT, ()=> {
    console.log(`Server Started at localhost:${PORT}`);
});