const express = require("express");
const path = require("path");
const connectDataBase = require("./database/connect");
const { errorHandler } = require("./middleware/errorHandler");

const PORT = process.env.PORT || 5000;
const app = express();

connectDataBase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(PORT, () => console.log(`Server Is Running On Port ${PORT}`));
