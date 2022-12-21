const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('yo man');
})

app.listen(3001,()=>{console.log('server is listening on port')})