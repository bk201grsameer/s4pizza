const { funcReturn } = require("../middleware/utility");
const Pizza = require("../model/PizzaSchema");

class PizzaController {
  getAllPizza = async (req, res) => {
    try {
      const pizzas = await Pizza.find();
      return res.json(funcReturn(true, pizzas));
    } catch (error) {
      return res.json(funcReturn(false, error.message));
    }
  };
}

const pizzacontroller = new PizzaController();
module.exports.pizzacontroller = pizzacontroller;
