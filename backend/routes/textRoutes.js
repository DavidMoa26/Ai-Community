import express from 'express';
import { createTextsPost, getAllTextsPosts } from '../controllers/textControllers.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/text-posts').get(getAllTextsPosts);
router.route('/text-posts').post(createTextsPost);


export default router;