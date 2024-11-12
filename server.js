const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gym_management',
  password: 'superuser@postgresql',
  port: 5432,
});

app.get('/api/members', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM member');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/trainers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM trainer');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/classes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM class
      JOIN assigned_to ON class.classid = assigned_to.classid
      JOIN trainer ON assigned_to.trainerid = trainer.trainerid
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/schedules', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * 
      FROM workout_plan
      JOIN requires ON workout_plan.planid = requires.planid
      JOIN equipment ON requires.equipmentid = equipment.equipmentid
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/equipment', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipment');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/member/:memberId', async (req, res) => {
  const { memberId } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
      member.memberid, 
      member.fname, 
      member.lname, 
      member.contactno, 
      member.age,
      member.fitnesslevel,
      member.dob,
      trainer.name, 
      emergency_contact.contactname, 
      emergency_contact.contactnumber, 
      class.classname, 
      workout_plan.planname
      FROM member 
      LEFT JOIN trainer ON member.trainerid = trainer.trainerid
      LEFT JOIN emergency_contact ON member.memberid = emergency_contact.memberid
      LEFT JOIN enrolled_in ON member.memberid = enrolled_in.memberid
      LEFT JOIN class ON enrolled_in.classid = class.classid
      LEFT JOIN follows ON member.memberid = follows.memberid
      LEFT JOIN workout_plan ON follows.planid = workout_plan.planid
      WHERE member.memberid = $1`, [memberId]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/newmember', async (req, res) => {
  const { fname, lname, contactno, trainer_id, fitness_level, dob} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO member (fname, lname, contactno, trainerid, fitnesslevel, dob) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [fname, lname, contactno, trainer_id, fitness_level, dob]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/members/:memberId/enroll-class', async (req, res) => {
  const { memberId } = req.params;
  const { class_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO enrolled_in (memberid, classid) VALUES ($1, $2) RETURNING *',
      [memberId, class_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error enrolling class for member:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/members/:memberId/follow-workout', async (req, res) => {
  const { memberId } = req.params;
  const { plan_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO follows (memberid, planid) VALUES ($1, $2) RETURNING *',
      [memberId, plan_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error following workout plan for member:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/members/:memberId/emergency-contact', async (req, res) => {
  const { memberId } = req.params;
  const { contact_name, contact_phone } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO emergency_contact (memberid, contactname, contactnumber) VALUES ($1, $2, $3) RETURNING *',
      [memberId, contact_name, contact_phone]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error adding emergency contact for member:", error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});