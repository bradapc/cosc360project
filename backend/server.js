const express = require('express');
const app = express();
const port = 5000;

//For parsing JSON bodies
app.use(express.json());

app.use('/register', require('./routes/register'));

app.get('/', (req, res) => {
    res.json({
        "version": "1.0.0",
        "active": true
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
})