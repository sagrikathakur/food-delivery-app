import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

// server instance //
const server = express();
const port = process.env.PORT;

// Middleware//
server.use(express.json());

// routes//
server.get("/", (req, res) => {
  res.json({
    message: "Welcome to my authentication page!"
  });
})

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
})