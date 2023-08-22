/* Third Party Dependencies */
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

/* Local Dependencies */
const config = require('./modules/config');
const routes = require('./routes/index');

/* Express App Configuration */
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use('/', routes);

app.listen(config.port, config.host, () => {
    console.log(`${config.appName} is running at ${config.host}:${config.port}`);
});