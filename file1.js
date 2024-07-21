// Import required modules
const express = require('express');
const app = express();
const port = 3000;

// Root route to display dinosaur names
app.get('/', (req, res) => {
    res.send('<h1>Dinosaur Names</h1><p>Tyrannosaurus Rex, Triceratops, Velociraptor, Brachiosaurus, Stegosaurus, Diplodocus</p>');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
