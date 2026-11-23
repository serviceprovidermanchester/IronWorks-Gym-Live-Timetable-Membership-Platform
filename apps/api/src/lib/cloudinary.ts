/**
 * Cloudinary CDN & Asset Transformation Service
 * IronWorks Gym · SPManchester Private Limited
 */
import { v2 as cloudinary } from 'cloudinary';
import { logger } from './logger';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ironworks-demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'test-key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'test-secret',
  secure: true,
});

export const cloudinaryService = {
  /**
   * Upload an avatar with automatic face centering, square crop, and webp optimization
   */
  async uploadMemberAvatar(
    fileDataUri: string,
    memberId: string
  ): Promise<{ url: string; publicId: string }> {
    try {
      if (!process.env.CLOUDINARY_API_KEY) {
        logger.info({ memberId }, '[DEV] Simulating Cloudinary upload');
        return {
          url: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80`,
          publicId: `dev_avatar_${memberId}`,
        };
      }

      const res = await cloudinary.uploader.upload(fileDataUri, {
        folder: 'ironworks/avatars',
        public_id: `avatar_${memberId}`,
        overwrite: true,
        transformation: [
          { width: 400, height: 400, crop: 'thumb', gravity: 'face' },
          { quality: 'auto', fetch_format: 'auto' },
        ],
      });

      return {
        url: res.secure_url,
        publicId: res.public_id,
      };
    } catch (error) {
      logger.error({ error, memberId }, 'Cloudinary avatar upload failed');
      throw error;
    }
  },

  /**
   * Upload class or coach promotional photography
   */
  async uploadMedia(
    fileDataUri: string,
    folder: string = 'ironworks/general'
  ): Promise<{ url: string; publicId: string }> {
    try {
      const res = await cloudinary.uploader.upload(fileDataUri, {
        folder,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      });

      return {
        url: res.secure_url,
        publicId: res.public_id,
      };
    } catch (error) {
      logger.error({ error, folder }, 'Cloudinary media upload failed');
      throw error;
    }
  },
};
