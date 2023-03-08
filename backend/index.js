const express = require("express");
const routes = require("./utils/routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use("/", routes);

app.listen(5000, () => {
  console.log("app running on port 5000");
});
