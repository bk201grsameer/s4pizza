const express = require("express");
const { pizzacontroller } = require("../controller/pizzaController");

const router = express.Router();

router.route("/getallpizzas").get(pizzacontroller.getAllPizza);
module.exports = router;
