// import { Pool } from "pg";

// export const client = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

import { Pool } from "pg";

export const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test PostgreSQL connection
client.connect()
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch((err) => console.error("PostgreSQL connection error:", err));