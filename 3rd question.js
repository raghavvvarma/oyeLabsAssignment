/*
3. Write a function in node that inserts the following data in mysql , the email should
be unique and if the email already exists in the system then the name of the customer
will be updated with the new name that is there in the array for that customer.
*/

const mysql = require('mysql');

const customers = [
  { email: "anurag11@yopmail.com", name: "anurag" },
  { email: "sameer11@yopmail.com", name: "sameer" },
  { email: "ravi11@yopmail.com", name: "ravi" },
  { email: "akash11@yopmail.com", name: "akash" },
  { email: "anjali11@yopmail.com", name: "anjai" },
  { email: "santosh11@yopmail.com", name: "santosh" }
];

const connection = mysql.createConnection({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  insertCustomers(customers);
});

function insertCustomers(customers) {
  customers.forEach((customer) => {
    const { email, name } = customer;

    // Check if email already exists in the database
    connection.query('SELECT customerId FROM customers WHERE email = ?', [email], (err, rows) => {
      if (err) {
        console.error('Error querying customers:', err);
        return;
      }

      if (rows.length > 0) {
        // Email already exists, update the customer's name
        const customerId = rows[0].customerId;
        connection.query('UPDATE customers SET name = ? WHERE customerId = ?', [name, customerId], (err, result) => {
          if (err) {
            console.error('Error updating customer name:', err);
            return;
          }
          console.log(`Updated customer name for email ${email}`);
        });
      } else {
        // Email does not exist, insert a new customer
        connection.query('INSERT INTO customers (name, email) VALUES (?, ?)', [name, email], (err, result) => {
          if (err) {
            console.error('Error inserting customer:', err);
            return;
          }
          console.log(`Inserted new customer with email ${email}`);
        });
      }
    });
  });
}

// Close the database connection when all operations are done
connection.end((err) => {
  if (err) {
    console.error('Error closing MySQL connection:', err);
    return;
  }
  console.log('Disconnected from MySQL database');
});
