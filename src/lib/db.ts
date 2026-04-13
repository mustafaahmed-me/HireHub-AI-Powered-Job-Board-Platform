import * as schema from "./schema"; // Apni schema file import karein
import { drizzle } from "drizzle-orm/postgres-js"; // Ya jo bhi aap use kar rahe hain
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema }); // <--- Yeh 'schema' dena zaroori hai