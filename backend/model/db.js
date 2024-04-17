const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
module.exports.connectToDb = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Successfully connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
};
