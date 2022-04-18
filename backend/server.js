const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  res.status(200).json({ message: "WELCOME TO SERVER" });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
