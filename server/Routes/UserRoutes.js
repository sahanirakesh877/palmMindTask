const express = require("express");
const router = express.Router();

const usercontroller = require("../Controllers/user-controller");

router.route("/register").post(usercontroller.register);
router.route("/login").post(usercontroller.login);
router.route("/logout").get(usercontroller.logout);

router.route("/getuser").get(usercontroller.getUser);
router.route("/getuser/:id").get(usercontroller.getSingleUser);
router.route("/deleteuser/:id").delete(usercontroller.deleteSingleUser);

router.route("/updateuser/:id").put(usercontroller.updateUser);
router.route("/forgotpassword").post(usercontroller.forgetpassword);
router
  .route("/resetpassword/:id/:resetToken")
  .post(usercontroller.resetPassword);

module.exports = router;
