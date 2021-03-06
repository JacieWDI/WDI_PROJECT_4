const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.plugin(require('mongoose-unique-validator'));

const router          = require('./config/routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { port, dbURI } = require('./config/environment');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');

mongoose.connect(dbURI, { useMongoClient: true });

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.use(customResponses);

app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);


app.listen(port, () => console.log(`Express is listening on port ${port}`));

module.exports = app;
