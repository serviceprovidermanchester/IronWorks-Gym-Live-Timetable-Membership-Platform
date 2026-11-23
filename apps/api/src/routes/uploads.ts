/**
 * Upload Routes — /v1/uploads
 * IronWorks Gym · SPManchester Private Limited
 */
import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';
import { cloudinaryService } from '../lib/cloudinary';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = Router();

const AvatarUploadSchema = z.object({
  imageDataUri: z.string().min(1, 'Image data URI required'),
});

// POST /uploads/avatar — member avatar upload
router.post('/avatar', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imageDataUri } = AvatarUploadSchema.parse(req.body);

    const upload = await cloudinaryService.uploadMemberAvatar(imageDataUri, req.member!.id);

    // Update avatarUrl in database
    await prisma.member.update({
      where: { id: req.member!.id },
      data: { avatarUrl: upload.url },
    });

    res.json({
      success: true,
      message: 'Avatar updated successfully',
      data: {
        avatarUrl: upload.url,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
