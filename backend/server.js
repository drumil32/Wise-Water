const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { errorHandler } = require('./middleware/errorMiddleware');
const { userTypeHandler } = require('./middleware/userTypeMiddleware');
const Temp = require('./models/tempModel');
const { Navigator } = require("node-navigator");
const navigator = new Navigator();

const PORT = process.env.PORT || 5000;
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

    async function successCallback(position) {
        console.log('change');
        console.log(position);
        const { latitude, longitude } = position;
        const temp = await Temp.create({
            latitude,
            longitude
        });
        if (!temp) {
            console.log("temp saved");
            console.log(temp);
        }
        res.json({
            msg: "done",
        })
        // map.innerHTML = '<iframe width="700" height="300" src="https://maps.google.com/maps?q=' + latitude + ',' + longitude + '&amp;z=15&amp;output=embed"></iframe>';
        // // Show a map centered at latitude / longitude.
        // reqcount++;
        // details.innerHTML = "Accuracy: " + accuracy + "<br>";
        // details.innerHTML += "Latitude: " + latitude + " | Longitude: " + longitude + "<br>";
        // details.innerHTML += "Altitude: " + altitude + "<br>";
        // details.innerHTML += "Heading: " + heading + "<br>";
        // details.innerHTML += "Speed: " + speed + "<br>";
        // details.innerHTML += "reqcount: " + reqcount;
    }
    function errorCallback(error) {

    }
    var options = {
        //enableHighAccuracy: false,
        timeout: 1000,
        //maximumAge: 0
    };
});

// app.use('/',userTypeHandler);

app.use('/api/user', require('./routes/userRoutes.js'));
app.use('/api/owner', require('./routes/ownerRoutes.js'));
app.use('/api/worker', require('./routes/workerRoutes.js'));
app.use('/api/customer', require('./routes/customerRoutes.js'));
app.use(errorHandler);

app.listen(PORT, () => { console.log('server is listening on PORT') })