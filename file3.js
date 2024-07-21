// Import required modules
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Read all data
app.get('/dinosaurs', (req, res) => {
    fs.readFile('./data/dinosaurs.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(JSON.parse(data));
    });
});

// Create new data
app.post('/dinosaurs', (req, res) => {
    fs.readFile('./data/dinosaurs.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        let jsonData = JSON.parse(data);
        jsonData.push(req.body);
        fs.writeFile('./data/dinosaurs.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
                return;
            }
            res.status(201).send('Dinosaur added successfully');
        });
    });
});

// Update data
app.put('/dinosaurs/:id', (req, res) => {
    fs.readFile('./data/dinosaurs.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        let jsonData = JSON.parse(data);
        let index = jsonData.findIndex(item => item.id == req.params.id);
        if (index !== -1) {
            jsonData[index] = req.body;
            fs.writeFile('./data/dinosaurs.json', JSON.stringify(jsonData), (err) => {
                if (err) {
                    res.status(500).send('Error writing file');
                    return;
                }
                res.send('Dinosaur updated successfully');
            });
        } else {
            res.status(404).send('Dinosaur not found');
        }
    });
});

// Delete data
app.delete('/dinosaurs/:id', (req, res) => {
    fs.readFile('./data/dinosaurs.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        let jsonData = JSON.parse(data);
        let index = jsonData.findIndex(item => item.id == req.params.id);
        if (index !== -1) {
            jsonData.splice(index, 1);
            fs.writeFile('./data/dinosaurs.json', JSON.stringify(jsonData), (err) => {
                if (err) {
                    res.status(500).send('Error writing file');
                    return;
                }
                res.send('Dinosaur deleted successfully');
            });
        } else {
            res.status(404).send('Dinosaur not found');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
