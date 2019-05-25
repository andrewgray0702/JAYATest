const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/location.routes');
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(express.static(__dirname+"/dist/JAYAProject"));
app.use(bodyParser.json());

app.use('/api/location/', locationRoutes);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/JAYAProject/index.html');
});
app.listen(port, host);
console.log('server started on port' + ' ' + port)