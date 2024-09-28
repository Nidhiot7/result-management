import express from "express";
import { login, register, logout } from "../controllers/authController.js";
// import { singleUpload } from "../middlewares/multer.js";
// const { uploadMarks } = require('../controllers/adminController');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Authentication routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
// router.route("/profile/update").put(isAuthenticated,singleUpload, updateProfile);

export default router;