import Fastisfy from "fastify";
import { config } from "./config.js";
const app = Fastisfy({
  logger: true, // Enable logging for better debugging and monitoring
});

app.get("/health", async (request, reply) => {
  return { status: "ok", message: "Memoria is healthy", env: config.NODE_ENV }; // Simple health check endpoint
});

const start = async () => {
  try {
    await app.listen({ port: config.PORT, host: config.HOST }); // Start the server on the configured port and host
    console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
  } catch (err) {
    app.log.error(err); // Log any errors that occur during server startup
    process.exit(1); // Exit the process with an error code
  }
};

start();
