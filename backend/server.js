const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const allowedOrigins = [
    "http://localhost:3000",
];

app.use(cors({
    origin: function(origin, callback) {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

//For parsing JSON bodies
app.use(express.json());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

app.get('/', (req, res) => {
    res.json({
        "version": "1.0.0",
        "active": true
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
})