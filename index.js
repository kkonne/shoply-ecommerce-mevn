const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { PORT, mongoUri } = require('./config');
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/api/items');

const app = express()
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json())

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log('MongoDB connected...');
})
.catch((error) => {
    console.log(error);
})

app.use('/api/items', itemsRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})