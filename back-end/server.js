const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb()
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use("/api/category", require("./routes/category.route"));
app.use("/api/product", require("./routes/product.route"));





app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});