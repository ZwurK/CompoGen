const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const userRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const componentRoutes = require('./routes/component');
const contactRoutes = require("./routes/contact");
const newsletterRoutes = require("./routes/newsletter");
const favoriteRoutes = require("./routes/favorite");

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/elements', componentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

mongoose.connect('mongodb://127.0.0.1:27017/GenElements', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
