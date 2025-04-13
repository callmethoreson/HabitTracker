const express = require('express');
const { Pool } = require('pg');

const app = express();
const path = require('path');
app.use(express.json());

console.log(path.join(__dirname, '../frontend'));

//serve up static webpage?
app.use(express.static(path.join(__dirname, '../frontend')));

const pool = new Pool({
  host: 'db',        // service name from docker-compose
  user: 'dev',
  password: 'password',
  database: 'ht-db',
  port: 5432,
});

app.get('/y', async (req, res) => {
    try {
        res.json("Yup");
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding user');
    }
});

console.log("Test2");

// Sample route
app.get('/habits', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM habits');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

// Sample route
app.get('/habitsAustin', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM habits WHERE user_id = 1 AND date_lookup_id = 1');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

app.get('/test', async (req, res) => {
    try {
        res.json("TESTISGOOD");
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding user');
    }
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});