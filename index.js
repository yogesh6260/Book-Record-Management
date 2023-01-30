const express = require('express');

// import db connection file
const dbConnection = require('./dbConnection');

// import routes
const usersRouter = require('./routes/users.js');
const booksRouter = require('./routes/books.js');

// import dotenv
const dotenv = require('dotenv');

dotenv.config();

const app = express();

dbConnection();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running successfully!"
    });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route doesn't exist",
    });
})
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});