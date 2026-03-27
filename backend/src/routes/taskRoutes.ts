import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  createTaskValidation,
  updateTaskValidation
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = Router();

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(validate(createTaskValidation), createTask);

router.route('/:id')
  .get(getTask)
  .put(validate(updateTaskValidation), updateTask)
  .delete(deleteTask);

export default router;
