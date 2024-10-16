const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URI
});

//homepage of server
app.get('/', async (req, res) => {
  res.json({ message: "Vanessa's server is up and running..." });
});

// GET all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const allContacts = await pool.query('SELECT * FROM contacts');
    res.json(allContacts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET a single contact by ID
app.get('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
    if (contact.rows.length === 0) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.json(contact.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new contact
app.post('/api/contacts', async (req, res) => {
  const { first_name, last_name, preferred_pronouns, email, birthday } = req.body; 
  try {
    const newContact = await pool.query(
      'INSERT INTO contacts (first_name, last_name, preferred_pronouns, email, birthday) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, preferred_pronouns, email, birthday]
    );
    res.json(newContact.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT to update an existing contact
app.put('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, preferred_pronouns, email, birthday } = req.body;
  try {
    const updateContact = await pool.query(
      'UPDATE contacts SET first_name = $1, last_name = $2, preferred_pronouns = $3, email = $4, birthday = $5 WHERE id = $6',
      [first_name, last_name, preferred_pronouns, email, birthday, id]
    );
    if (updateContact.rowCount === 0) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.json({ msg: 'Contact updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE a contact
app.delete('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteContact = await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    if (deleteContact.rowCount === 0) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.json({ msg: 'Contact deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Vanessa's server is running on port ${port}`);
});
