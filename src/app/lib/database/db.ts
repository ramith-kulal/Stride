import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";

// Create PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

// Connect Drizzle ORM to PostgreSQL
export const db = drizzle(pool);
