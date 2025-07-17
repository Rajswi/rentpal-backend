import express from 'express'
import { createItem, getAllItems  } from '../controllers/itemController'
import { requireAuth } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/', getAllItems)
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    requireAuth(req as any, res, () => {
      createItem(req as any, res); // safe to call after auth
    });
  } catch (err) {
    next(err);
  }
})

export default router
