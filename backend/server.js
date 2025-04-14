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
    const dateLookup = await pool.query(
      'SELECT * FROM date_lookup WHERE start_date < CURRENT_DATE ORDER BY start_date DESC LIMIT 1;'
    ).then(res => res.rows[0]);

    console.log(`date_lookup_id = ${dateLookup.id}`);

    const test = await pool.query(
      `SELECT * FROM habits WHERE user_id = ${userID} and date_lookup_id = ${dateLookup.id};`
    ).then(res => res.rows);

    console.log(`habits list : ${test}`);
    console.log(JSON.stringify(test));

    const result = `userID = ${userID} : date_lookup_id = ${dateLookup}`

    //define a new object that will compose the datelookup and habit entry
    const habitPackage = {
      list: test,
      dates: dateLookup,
      dateLookupId: dateLookup.id,
      userId: userID
    }

    // res.json(test);
    res.json(habitPackage);
  } catch (error) {
    console.log(error);
    res.status(500).send('No-user availabe with that email address');
  }
});

app.get('/api/dateLookup/:id', async (req, res) => {
  const date_lookup_id = req.params.id;

  try {
    const result = await pool.query(
      'SELECT * FROM date_lookup WHERE id = $1',
      [date_lookup_id]
    );

    if(result.rows.length > 0){
      console.log(result);
      res.send(result.rows[0]);
    }else{
      return res.status(404).send({ message: `ALERT: No date with that id -> ${date_lookup_id}` });
    }



  }catch{
    console.log(error);
    res.status(500).send('someting went wrong!');
  }

});

app.get('/api/habits/:userid/:datelookupid', async (req, res) => {
  const date_lookup_id = req.params.datelookupid;
  const user_id = req.params.userid;

  //log
  console.log("userid", user_id);
  console.log("datelookup", date_lookup_id);

  try {
    const result = await pool.query(
      'SELECT * FROM habits WHERE user_id = $1 AND date_lookup_id = $2 ',
      [user_id, date_lookup_id]
    );

    if(result.rows.length > 0){
      console.log(result);
    }else{
      return res.status(404).send({ message: `ALERT: No date with that id -> ${date_lookup_id}` });
    }

    //getting current date_lookup_id
    const dateLookup = await pool.query(
      'SELECT * FROM date_lookup WHERE id = $1 LIMIT 1',
      [date_lookup_id]
    ).then(res => res.rows[0]);

    const habitPackage = {
      list: result.rows,
      dates: dateLookup,
      dateLookupId: dateLookup.id,
      userId: user_id
    }


    res.json(habitPackage);
  }catch(error){
    console.log(error);
    res.status(500).send('someting went wrong!');
  }

});


app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});

console.log("server.js started");