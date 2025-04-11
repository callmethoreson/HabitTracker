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
  database: 'devdb',
  port: 5432,
});

app.get('/y', async (req, res) => {
    try {
        //const result = await pool.query('SELECT * FROM habit_table');
        res.json("Yup");
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding user');
    }
});

// Sample route
app.get('/habits', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM habit_table');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

app.get('/test', async (req, res) => {
    try {
        //const result = await pool.query('SELECT * FROM habit_table');
        res.json("TESTISGOOD");
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding user');
    }
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});