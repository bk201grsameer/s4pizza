const express = require("express");
const {
  loginController,
  signupController,
  getAllUserController,
} = require("../controller/userController");
const router = express.Router();

router.route("/login").post(loginController);
router.route("/signup").post(signupController);
router.route('/getallusers').get(getAllUserController)
module.exports = router;
