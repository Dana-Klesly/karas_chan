import { app } from "./app";

const env = {
  API_PORT: process.env.API_PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
};

console.log(`Server running on port ${env.API_PORT.toString()}`);
console.log(`Environment: ${env.NODE_ENV}`);

app.listen(env.API_PORT, () => {
  console.log(`Server is running on http://localhost:${env.API_PORT.toString()}`);
});
