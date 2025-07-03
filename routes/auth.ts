import express, { Request, Response, NextFunction } from 'express';
// import { registerUser, loginUser } from '../controllers/authController';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.registerUser(req, res);
  } catch (err) {
    next(err);
  }
});
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.loginUser(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
