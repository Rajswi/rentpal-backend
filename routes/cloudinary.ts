import express, { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import multer from "multer";
import { requireAuth } from "../middleware/authMiddleware"; // Make sure only logged-in users can do this

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = (fileBuffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "item-images" }, // Optional: organize in folders
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

router.post(
  "/upload",
  requireAuth,
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }
      const cloudinaryData = await uploadToCloudinary(req.file.buffer);
      const imageUrl = cloudinaryData.secure_url;

      // 3. Get other item details from the request body
      const { title } = req.body;

      res.status(201).json({
        message: "Item created successfully!",
        item: { title, imageUrl },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  }
);

export default router;
