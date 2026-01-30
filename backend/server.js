const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.json({
        "version": "1.0.0",
        "active": true
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
})