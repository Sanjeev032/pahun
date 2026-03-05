import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image uploaded',
        image: `/${req.file.path}`,
    });
});

export default router;
