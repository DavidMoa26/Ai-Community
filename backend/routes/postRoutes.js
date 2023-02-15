import express from 'express';
import { getAllImagesPosts, createImagesPost } from '../controllers/postControllers.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/image-posts').get(getAllImagesPosts);
router.route('/image-posts').post(createImagesPost);

export default router;