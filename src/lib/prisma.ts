import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg"; // Import the PostgreSQL adapter for Prisma
import { config } from "../config.js"; // Import the configuration to access the database URL

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: config.DATABASE_URL }), // Initialize Prisma with the PostgreSQL adapter and connection string
});

export default prisma; // Export the Prisma client instance for use in other parts of the application
