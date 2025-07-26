require("dotenv").config();
const { Client } = require("pg");

async function resetDb() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    await client.query(`DROP TABLE IF EXISTS transactions, employee, category, admin_users CASCADE`);
    console.log(' Tables dropped');


  } catch (err) {
    console.error(' Error resetting DB:', err.stack);
  } finally {
    await client.end();
  }
}

resetDb();
