const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors()); // Allow all origins by default

// Path to the JSON database
const dbFilePath = path.join(__dirname, 'db.json');

// Helper function to read data from the database
const readDatabase = () => {
  const data = fs.readFileSync(dbFilePath);
  return JSON.parse(data);
};

// Helper function to write data to the database
const writeDatabase = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Get all clients
app.get('/api/clients', (req, res) => {
  const clients = readDatabase();
  res.json(clients);
});

// Get a specific client by ID
app.get('/api/clients/:id', (req, res) => {
  const clients = readDatabase();
  const client = clients.find(c => c.id === parseInt(req.params.id));
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

// Add a new client
app.post('/api/clients', (req, res) => {
  const clients = readDatabase();
  const newClient = req.body;
  newClient.id = clients.length ? clients[clients.length - 1].id + 1 : 1;  // ID assignment

  clients.push(newClient);
  writeDatabase(clients);

  res.status(201).json(newClient);
});

// Update a client by ID
app.put('/api/clients/:id', (req, res) => {
  const clients = readDatabase();
  const index = clients.findIndex(c => c.id === parseInt(req.params.id));

  if (index !== -1) {
    clients[index] = { ...clients[index], ...req.body };
    writeDatabase(clients);
    res.json(clients[index]);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

// Delete a client by ID
app.delete('/api/clients/:id', (req, res) => {
  let clients = readDatabase();
  clients = clients.filter(c => c.id !== parseInt(req.params.id));

  if (clients.length !== readDatabase().length) {
    writeDatabase(clients);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
