import express, { Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { requireAuth } from '../middleware/authMiddleware'; // Make sure only logged-in users can do this
import { AuthenticatedRequest } from '../types/express'
const router = express.Router();

router.get('/sign', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  try {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      process.env.CLOUDINARY_API_SECRET!
    );
    res.status(200).json({ timestamp, signature });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate signature' });
  }
});

export default router;
