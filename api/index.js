const express = require("express");
const serverless = require("serverless-http");
const { connectToMongoDB, closeConnection } = require('./db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const app = express();
app.use(express.json());
let db;
// Routes
app.get("/api/checkDBconnection", async (req, res) => {
  
try {
        // Ensure DB is connected (should be connected at startup)
        if (!db) {
            db = await connectToMongoDB();
        }

        // Test the connection by accessing a collection
        const collection = db.collection('users');

        // Send success response
        res.send({
            status: 'success',
            message: 'MongoDB connection is active'
        });
    } catch (error) {
        console.error('Error in /api/checkDBconnection:', error);
        // Send error response
        res.send({
            status: 'error',
            message: 'Failed to connect to MongoDB',
            error: error.message
        });
    }
});


app.post("/api/loginUser", async (req, res) => {
  try {
    console.log("Login user API called");
    console.log(req.body);

    const { email, password, rememberDevice } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send({ message: "❌ Email and password are required" });
    }

    // Ensure DB connection
    if (!db) {
      db = await connectToMongoDB();
    }

    const collection = db.collection("users");

    // Find user by email
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "❌ Invalid email or password" });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "❌ Invalid email or password" });
    }

    // ✅ If login successful and rememberDevice is true, update DB
    if (rememberDevice === true) {
      await collection.updateOne(
        { email },
        { $set: { rememberDevice: true, updatedAt: new Date() } }
      );
    }


    jwt.sign({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }, process.env.JWT_SECRET, function(err, token) {
      console.log(token);
    res.status(200).send({
      message: "✅ Login successful",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: token,
        rememberDevice: rememberDevice === true, // send back status
      },
    });
    });
    
  } catch (error) {
    console.error("❌ Error in /api/loginUser:", error);
    res.status(500).send({ error: "Error during login", details: error.message });
  }
});


app.get("/api/verifyToken", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send({ valid: false, message: "No token" });
  }

  const token = authHeader.split(" ")[1]; // get token after 'Bearer'

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ valid: false, message: "Invalid token" });
    }

    // token valid
    res.send({ valid: true, user });
  });
});
app.post("/api/createUser", async (req, res) => {
  try {
    console.log("Create user API called");
    console.log(req.body);

    const { firstName, lastName, email, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: "❌ Missing required fields" });
    }

    // Ensure DB connection
    if (!db) {
      db = await connectToMongoDB();
    }

    const collection = db.collection("users");

    // Check if email already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "❌ Email already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user with hashed password
    const result = await collection.insertOne({
      firstName,
      lastName,
      email,
      rememberDevice: false,
      password: hashedPassword, // Store hashed password
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user",
      isActive: true,
    });

    res.status(200).send({
      message: "✅ User inserted successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({ message: "❌ Email already exists" });
    }
    console.error("❌ Error in /api/createUser:", error);
    res.status(500).send({ error: "Error inserting user", details: error.message });
  }
});

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);



// ✅ Run locally if you use `node server.js`
if (require.main === module) {
  const PORT = 3004;
  app.listen(PORT, () => {
    console.log(`Local server running at http://localhost:${PORT}`);
  });
}