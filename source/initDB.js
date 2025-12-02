const pool = require("./connectionDB");

async function createTable() {
  const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

  try {
    await pool.query(query);
    console.log("The 'users' table was created successfully.");
  } catch (error) {
    console.error("Error creating table", err);
  } finally {
    pool.end();
  }
}

createTable();