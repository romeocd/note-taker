const express = require('express');
const fs = require('fs');
const path = require ('path');

const PORT = process.env.PORT || 3001;

const app = express();

// npm package for generating unique ID
const { v4: uuidv4 } = require('uuid');

const db = require('./db/db.json')

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use("/public/assets", express.static(__dirname + "/public/assets"));
app.use(express.urlencoded({ extended: true }));

// GET /api/notes route
app.get('/api/notes', (req, res) => {
    try {
      const data = fs.readFileSync('./db/db.json', 'utf8');
      const dbData = JSON.parse(data);
      res.json(dbData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// POST /api/notes route to add new notes
app.post('/api/notes', (req, res) => {
    try {
      const newNote = req.body;
      newNote.id = uuidv4();
  
      db.push(newNote);
  
      fs.writeFileSync('./db/db.json', JSON.stringify(db));
  
      res.json(newNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// DELETE /api/notes/:id route to delete a note
app.delete('/api/notes/:id', (req, res) => {
    try {
      const newDb = db.filter((note) => note.id !== req.params.id);
  
      fs.writeFileSync('./db/db.json', JSON.stringify(newDb));
  
      res.json(newDb);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// GET route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});