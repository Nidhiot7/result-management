import express from "express"
import { singleUpload } from "../middleware/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadMarks } from "../controllers/adminController.js";
import { getAllStudents } from "../controllers/studentController.js";

const router = express.Router();

// Protect admin routes with authMiddleware and singleUpload for file upload
router.route('/uploadMarks').post(authMiddleware, singleUpload, uploadMarks);
router.route('/students').get(authMiddleware, singleUpload, getAllStudents)

export default router;