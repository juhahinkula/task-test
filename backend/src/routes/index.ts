import { Request, Response, Router } from 'express';
import authRoutes from './authRoutes.js';
import taskRoutes from './taskRoutes.js';

const router = Router();

// Health check
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

export default router;
