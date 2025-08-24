const express = require("express");
const serverless = require("serverless-http");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Express from Serverless!");
});

// ✅ Export the app for serverless
module.exports.handler = serverless(app);

// ✅ Run locally if you use `node server.js`
if (require.main === module) {
  const PORT = 3003;
  app.listen(PORT, () => {
    console.log(`Local server running at http://localhost:${PORT}`);
  });
}