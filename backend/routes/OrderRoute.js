const express = require("express");
const { orderController } = require("../controller/OrderController");

const router = express.Router();

router.route("/createorder").post(orderController.createOrder);
router.route("/getallorders").get(orderController.getAllOrders);
module.exports = router;
