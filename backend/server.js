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
        res.json("TESTISTGOOD");
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding user');
    }
});

////////////
//request for habits given an email address in the body
//if request has no other information, assume current date, and go from there
///////////

app.post('/api/habits', async (req, res) => {
  try {
    //get email from body
    let email = req.body.email;

    const userID = await pool.query(
      `SELECT id FROM users WHERE email like $1`,
      [email]
    ).then(res => res.rows.length > 0 ? res.rows[0].id : false);

    if(userID){
      console.log(`userID = ${userID}`);
    }else{
      console.log(`ALERT: User not defined with email -> ${email}`);
      return res.status(404).send({ message: `ALERT: User not defined with email -> ${email}` });
    }
    
    //getting current date_lookup_id
    const dateLookupId = await pool.query(
      'SELECT id FROM date_lookup WHERE start_date < CURRENT_DATE ORDER BY start_date DESC LIMIT 1;'
    ).then(res => res.rows[0].id);

    console.log(`date_lookup_id = ${dateLookupId}`);

    const test = await pool.query(
      `SELECT * FROM habits WHERE user_id = ${userID} and date_lookup_id = ${dateLookupId};`
    ).then(res => res.rows);

    console.log(`habits list : ${test}`);
    console.log(JSON.stringify(test));

    const result = `userID = ${userID} : date_lookup_id = ${dateLookupId}`

    res.json(test);
  } catch (error) {
    console.log(error);
    res.status(500).send('No-user availabe with that email address');
  }
});


app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});

console.log("server.js started");