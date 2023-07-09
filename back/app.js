const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const userRoutes = require('./auth/routes/auth');
const profileRoutes = require('./auth/routes/profile');
const componentRoutes = require('./app/routes/component');
const contactRoutes = require("./app/routes/contact");
const newsletterRoutes = require("./app/routes/newsletter");
const favoriteRoutes = require("./app/routes/favorite");
const articleRoutes = require("./blog/routes/article");

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());

// App

app.use('/api/auth', userRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/components', componentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Blog

app.use('/api/article', articleRoutes);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
