const express = require("express");
const path = require("path");
const connectDataBase = require("./database/connect");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

connectDataBase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/UserRoute"));
app.use("/api/product", require("./routes/Product"));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server Is Running On Port ${PORT}`));
