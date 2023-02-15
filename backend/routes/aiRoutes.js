import express from 'express';
import { createImage, createText } from '../controllers/aiControllers.js';

const router = express.Router();


router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/image').post(createImage);
router.route('/text').post(createText);



export default router;