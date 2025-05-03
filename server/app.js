const express = require("express");
const app = express();
const port = 5050;

const taskController = require("./controller/task");
const projectController = require("./controller/project");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/task", taskController);
app.use("/project", projectController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
