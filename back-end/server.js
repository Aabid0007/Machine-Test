const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb()
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:5173', 
    'https://deepnetsoft-0twc.onrender.com' 
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/category", require("./routes/category.route"));
app.use("/api/products", require("./routes/product.route"));

app.use(express.static(path.join(__dirname, 'dist')));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});



app.use(errorHandler);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});