const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.send('yo man');
})


app.use('/api/user',require('./routes/userRoutes.js'));

app.listen(port,()=>{console.log('server is listening on port')})