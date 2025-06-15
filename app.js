const express = require('express');
const sequelize = require("./models");
const cors = require('cors');
const port = 3000;

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

// Routes
const authRouter = require("./routes/authroutes");
const userroutes = require("./routes/userroutes");

app.use("/auth", authRouter);
app.use("/user",userroutes);

// DB connect + sync
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

sequelize.sync({ alter: true })
  .then(() => console.log("Models synced"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
