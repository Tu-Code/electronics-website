require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path');

// app
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database.'))
app.use(express.json())

// route 
const agencyRoutes = require('./routes/agency');
const adminRoutes = require('./routes/admin');

app.use('/agency', agencyRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'home.html'));
});
  
app.get('/partnership-account', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'partnership-account.html'));
});

app.get('/admin/admin-account', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'admin-account.html'));
});

app.listen(3000, () => console.log('Server Started.'))