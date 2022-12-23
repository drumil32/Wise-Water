const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const {errorHandler} = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.send('yo man');
});


app.use('/api/user',require('./routes/userRoutes.js'));
app.use('/api/owner',require('./routes/ownerRoutes.js'));
app.use('/api/worker',require('./routes/workerRoutes.js'));
app.use('/api/customer',require('./routes/customerRoutes.js'));
app.use(errorHandler);

app.listen(PORT,()=>{console.log('server is listening on PORT')})