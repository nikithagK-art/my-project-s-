const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "studentdb"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// API with Constraints
app.post("/register", (req, res) => {
  const { name, age, gender, dob, roll } = req.body;

  if (!name || name.length < 3)
    return res.json({ message: "Name must be at least 3 characters" });

  if (age < 1 || age > 100)
    return res.json({ message: "Age must be between 1 and 100" });

  if (!gender)
    return res.json({ message: "Gender required" });

  if (!dob)
    return res.json({ message: "DOB required" });

  if (!roll)
    return res.json({ message: "Roll Number required" });

  const sql = "INSERT INTO registration (name, age, gender, dob, roll) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, age, gender, dob, roll], (err) => {
    if (err) return res.json({ message: "Roll Number already exists" });
    res.json({ message: "Registration Successful!" });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
