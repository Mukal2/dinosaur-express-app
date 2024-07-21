const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Absolute path to dinosaurs.json
const filePath = path.join(__dirname, 'data', 'dinosaurs.json');
console.log('Reading file from:', filePath);

app.get('/dinosaurs', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
            return;
        }
        // Set the Content-Type header to application/json
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
