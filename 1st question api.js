/*
1. Make a api for phone number login

a. Make add Customer api for customer, assume admin is adding customer ..
use the input params validation, code commenting, logging and check for
duplicates where required .
b. Use of transaction connection in mysql is good to have (not the requirement)
*/



const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'your_mysql_host',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_mysql_database',
});

// Add Customer API endpoint
app.post('/api/customers', (req, res) => {
  const { name, phoneNumber } = req.body;

  // Validate input parameters
  if (!name || !phoneNumber) {
    return res.status(400).json({ error: 'Name and phoneNumber are required.' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return res.status(500).json({ error: 'Error connecting to the database.' });
    }

    // Check for duplicates
    const checkDuplicateQuery = 'SELECT COUNT(*) AS count FROM customers WHERE phone_number = ?';
    connection.query(checkDuplicateQuery, [phoneNumber], (duplicateErr, duplicateResult) => {
      if (duplicateErr) {
        console.error('Error checking for duplicates:', duplicateErr);
        return res.status(500).json({ error: 'Error checking for duplicates.' });
      }

      const duplicateCount = duplicateResult[0].count;

      if (duplicateCount > 0) {
        return res.status(409).json({ error: 'Customer with the same phone number already exists.' });
      }

      // Add customer to the database
      const addCustomerQuery = 'INSERT INTO customers (name, phone_number) VALUES (?, ?)';
      connection.query(addCustomerQuery, [name, phoneNumber], (addErr, addResult) => {
        connection.release();

        if (addErr) {
          console.error('Error adding customer:', addErr);
          return res.status(500).json({ error: 'Error adding customer.' });
        }

        const customerId = addResult.insertId;
        return res.json({ customerId });
      });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
