// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// // Enable CORS for frontend running on localhost:5173
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

// app.use(express.json());

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello I am Suleman from Backend" });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// Allow CORS from frontend (without the trailing slash)
// app.use(
//   cors({
//     origin: "https://express-crud-delta.vercel.app", // Exact frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight request
//     allowedHeaders: ["Content-Type", "Authorization"], // Allow headers like Content-Type, Authorization if needed
//     credentials: true,
//   })
// );
// Required to handle preflight requests properly
// app.options("*", cors());

app.use(express.json());

let users = []; // our fake database
let id = 1;

// CREATE
app.post("/api/users", (req, res) => {
  const user = { id: id++, ...req.body };
  users.push(user);
  res.status(201).json(user);
  res.send("User created");
});

// READ
app.get("/api/users", (req, res) => {
  res.json(users);
  res.send("Get all users");
});

// UPDATE
app.put("/api/users/:id", (req, res) => {
  const userId = +req.params.id;
  users = users.map((user) =>
    user.id === userId ? { ...user, ...req.body } : user
  );
  res.json({ message: "User updated" });
});

// DELETE
app.delete("/api/users/:id", (req, res) => {
  const userId = +req.params.id;
  users = users.filter((user) => user.id !== userId);
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
