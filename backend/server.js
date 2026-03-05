require("dotenv").config();
const PORT = process.env.PORT || 6000;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require('./src/routes');
const sequelize = require("./config/database");
const path = require('path');


const app = express();

// Middleware
app.use(helmet());
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

app.use('/audios', express.static(path.join(__dirname, 'audios')));

// Test route
app.get("/", (req, res) => {
  res.send({ message: "API is running..." });
});

app.use('/api', routes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
})();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
