const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const ConnectDB = require("./src/utils/db");
const recipeRoutes = require("./src/routes/recipieRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", recipeRoutes);

ConnectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
