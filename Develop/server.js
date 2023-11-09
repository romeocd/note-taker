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

