const { funcReturn } = require("../middleware/utility");
const Order = require("../model/Order");

class OrderController {
  createOrder = async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const order = await newOrder.save();
      return res.json(funcReturn(true, order));
    } catch (error) {
      return res.json(funcReturn(false, error.message));
    }
  };
  getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({});
      return res.json(funcReturn(true, orders));
    } catch (error) {
      return res.json(funcReturn(false, error.message));
    }
  };
}

const orderController = new OrderController();
module.exports.orderController = orderController;
