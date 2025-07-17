import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { createItem, getAllItems } from '../controllers/itemController';
import { requireAuth } from '../middleware/authMiddleware';
import { AuthenticatedRequest } from '../types/express'; 

const router = express.Router();

router.get('/', getAllItems);

// Middleware wrapper
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  requireAuth(req as AuthenticatedRequest, res, (err?: any) => {
    if (err) return next(err);
    createItem(req as AuthenticatedRequest, res);
  });
});

export default router;
