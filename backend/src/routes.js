const express = require("express");
const router = express.Router();

const authController = require("./controller/auth.controller");

router.post("/add_super_admin" , authController.addSuperAdmin);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;

