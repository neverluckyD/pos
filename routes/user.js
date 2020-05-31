var express = require("express");
const UserController = require("../controllers/UserController");

var router = express.Router();

router.get("/", UserController.userList);
router.get("/:id", UserController.userDetail);
router.post("/", UserController.addUser);
router.put("/:id", UserController.editUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;