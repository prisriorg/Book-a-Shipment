const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'shipping_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Create database tables if they don't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS shipping_rates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courier VARCHAR(50) NOT NULL,
      base_rate DECIMAL(10,2) NOT NULL,
      rate_per_km DECIMAL(10,2) NOT NULL
    )
  `;
  
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    
    // Insert sample data if table is empty
    connection.query('SELECT COUNT(*) as count FROM shipping_rates', (err, results) => {
      if (err) {
        console.error('Error checking table:', err);
        return;
      }
      
      if (results[0].count === 0) {
        const sampleData = [
          ['delhivery', 100.00, 15.00],
          ['dtdc', 120.00, 12.00],
          ['bluedart', 150.00, 18.00]
        ];
        
        connection.query(
          'INSERT INTO shipping_rates (courier, base_rate, rate_per_km) VALUES ?',
          [sampleData],
          (err) => {
            if (err) {
              console.error('Error inserting sample data:', err);
            }
          }
        );
      }
    });
  });
});

// API endpoint to get shipping rates
app.get('/api/shipping-rates', (req, res) => {
  const { pickup, delivery } = req.query;
  
  // In a real application, you would calculate the distance between pickup and delivery
  // For demo purposes, we'll use a fixed distance of 10km
  const distance = 10;
  
  const query = `
    SELECT 
      courier,
      base_rate + (rate_per_km * ?) as price
    FROM shipping_rates
  `;
  
  connection.query(query, [distance], (err, results) => {
    if (err) {
      console.error('Error fetching shipping rates:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 