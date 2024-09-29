const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/issue-tracker', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


const projectRoutes = require('./routes/projects');
app.use('/', projectRoutes);

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
