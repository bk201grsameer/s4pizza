const express = require("express");
const app = express();
const port = process.env.PORT || 9001;
const dotenv = require("dotenv");
const { connectToDb } = require("./model/db");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

dotenv.config();
connectToDb();

app.use(express.json());
app.use("/api/pizza", require("./routes/pizzaRoute"));
app.use("/api/user", require("./routes/UserRoute"));
app.use("/api/order", require("./routes/OrderRoute"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
