import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { createStudent, deleteStudent, getAllStudents, getStudentById, getStudentMarks, updateStudent } from "../controllers/studentController.js";

const router = express.Router();

router.route('/students').post(authMiddleware, createStudent);
router.route('/students').get(authMiddleware, getAllStudents);
router.route('/students/:studentId').get(authMiddleware, getStudentById);
router.route('/students/:studentId').put(authMiddleware, updateStudent);
router.route('/students/:studentId').delete(authMiddleware, deleteStudent);
router.route('/students/:studentId').get( authMiddleware, getStudentMarks);

export default router;

