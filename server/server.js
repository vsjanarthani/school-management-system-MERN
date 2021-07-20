//import modules and files
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/connection');
const app = express();
const routes = require('./routes');

// middlewares
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.json({ extended: true, limit: "20mb" }));
app.use(cors());
app.use(routes);

const PORT = process.env.PORT || 5000;

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (_req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// listening to PORT
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`🌍 Now listening on localhost:${PORT}`)
    });
});

// uncomment app.get to deploy