const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(''))
  .catch(err => console.error('MongoDB connection error:', err));

const userCollection = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: String
});

const summaryCollection = new mongoose.Schema({
  data: {
      labels: { type: [String], required: true }, 
      datasets: [{
          label: { type: String, required: true }, 
          data: { type: [Number], required: true }, 
          backgroundColor: { type: [String], required: true },
          borderColor: { type: [String], required: true },
          borderWidth: { type: Number, required: true }, 
      }]
  }
});

const reportCollection = new mongoose.Schema({
  data: {
      datasets: [{
          label: { type: String, required: true }, 
          data: { type: [{x: {type: Number, required: true}, y: {type: Number, required: true}}], required: true }, 
          backgroundColor: { type: String, required: true },
          borderColor: { type: String, required: true },
          pointRadius: { type: Number, required: true }, 
      }]
  }
});


const User = mongoose.model('User', userCollection);
const Summary = mongoose.model('Summary', summaryCollection);
const Report = mongoose.model('Report', reportCollection);

const check_auth = async (req, res, next) => {
  try {
    const authorized_token = req.header('Authorization').replace('Bearer ', '');
    const decoded_values = jwt.verify(authorized_token, process.env.JWT_SECRET || 'secret-token');
    const current_user = await User.findById(decoded_values.userId);
    
    if (!current_user) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token.' });
  }
};

app.post('/api/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const curr_user = await User.findOne({ userName });
    if (!curr_user || (password!==curr_user.password)) {
      throw new Error('Invalid login credentials');
    }
    const token = jwt.sign(
      { userId: curr_user._id },
      process.env.JWT_SECRET || 'secret-token',
      { expiresIn: '2h' }
    );

    res.send({
      token,
      user: {
        _id: curr_user._id,
        name: curr_user.name,
        userName: curr_user.userName
      }
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


app.get('/api/summary', check_auth, async (req, res) => {
  try {
    const summaryData = await Summary.find();
    res.json(summaryData);
  } catch (error) {
    console.error('Error fetching summary data:', error);
  }
});

app.get('/api/report', check_auth, async (req, res) => {
  try {
    const reportData = await Report.find();
    res.json(reportData);
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});