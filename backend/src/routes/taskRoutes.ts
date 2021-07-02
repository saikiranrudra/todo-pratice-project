import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getOneTask,
  updateTask,
  todaysTasks,
  completedTask
} from "./../controllers/taskController";

const router = Router();

router
  .route("/")
  .post(createTask)
  .put(updateTask)
  .delete(deleteTask);

router.get("/one", getOneTask);
router.get("/today", todaysTasks);
router.get("/completed", completedTask)
router.post("/all", getAllTask)

export default router;
