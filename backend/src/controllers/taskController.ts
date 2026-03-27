import { Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { AuthRequest, CreateTaskDTO, UpdateTaskDTO } from '../types/index.js';
import Task from '../models/Task.js';
import { Op } from 'sequelize';

// Validation rules
export const createTaskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('description').optional().trim(),
  body('status').optional().isIn(['todo', 'in-progress', 'done']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format')
];

export const updateTaskValidation = [
  body('title').optional().trim().notEmpty().isLength({ max: 200 }),
  body('description').optional().trim(),
  body('status').optional().isIn(['todo', 'in-progress', 'done']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format')
];

// Controllers
export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, priority, search, sortBy = 'createdAt', order = 'DESC' } = req.query;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      userId: req.user!.id
    };

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const tasks = await Task.findAll({
      where,
      order: [[sortBy as string, order as string]]
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const taskData: CreateTaskDTO = req.body;

    const task = await Task.create({
      ...taskData,
      userId: req.user!.id
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
      return;
    }

    const updateData: UpdateTaskDTO = req.body;
    await task.update(updateData);

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
      return;
    }

    await task.destroy();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
