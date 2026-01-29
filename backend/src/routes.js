const express = require("express");
const router = express.Router();
const upload = require("./middlewares/multer.middleware");

const authMiddleware = require("./middlewares/auth.middleware");
const authController = require("./controller/auth.controller");
const userController = require("./controller/user.controller");
const forgetPasswordController = require("./controller/forgetPassword.controller");
const categoryController = require("./controller/category.controller");
const audioController = require("./controller/audio.controller");
const resultController = require("./controller/result.controller");

router.post("/add_super_admin", authController.addSuperAdmin);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

//forget password
router.post('/forget-password', forgetPasswordController.forgetPassword);
router.post('/resetandupdate', forgetPasswordController.resetandUpdatePassword);

//common for admin and user
router.post('/admin/add_new_user', authMiddleware.authenticateJWT, authController.addNewUser)
router.put('/admin/update_user/:id', authMiddleware.authenticateJWT, authController.updateUser)
router.delete('/admin/delete_user/:id', authMiddleware.authenticateJWT, authController.deleteUser)

// get all admin
router.get('/admin/get_all_admins', authMiddleware.authenticateJWT, authController.getAllAdmin)

//all users apis
router.get('/user/get_all_users', authMiddleware.authenticateJWT, userController.getAllUsers)

//for adding category
router.post('/admin/add_new_category', authMiddleware.authenticateJWT, categoryController.addNewCategory)

//adding audio file
router.post('/admin/add_new_audio', upload.single('file'), authMiddleware.authenticateJWT, audioController.addNewAudio)

//audio play record
router.post('/student/add_result', authMiddleware.authenticateJWT, resultController.addResult)

//see marks
router.get('/student/get_result', authMiddleware.authenticateJWT, resultController.getResult)

module.exports = router;

