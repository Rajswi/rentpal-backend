import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}
export const createItem = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, imageUrl, price, category, department, duration } = req.body;
  const userId = req.user?.userId;

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const item = await prisma.item.create({
      data: {
        title,
        description,
        imageUrl,
        price: parseInt(price),
        category,
        department,
        duration,
        ownerId: userId,
      },
    });

    res.status(201).json({ message: 'Item created successfully', item });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
}

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}

