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
app.use(express.static('public'));
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

