require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const DBURL = 'mongodb://127.0.0.1/mongole'
mongoose.connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true},err => {
    console.log(err ? err.message : 'Connected to MongoDB');
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

const UserRoutes = require('./routes/UserRoutes');
app.use(UserRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
