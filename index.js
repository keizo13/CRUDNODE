const express = require("express");
const routes = require('./app/routes/routes.js');
const app = express();

app.use(express.json());
app.use(routes);


app.listen(3003, () => {
  console.log("app is running");
});

