const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  variants: [{ type: String }],
  prices: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
});

//Export the model
const Pizza = mongoose.model("Pizza", pizzaSchema);
module.exports = Pizza;
