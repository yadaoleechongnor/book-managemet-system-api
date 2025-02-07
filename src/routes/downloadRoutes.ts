
import express from 'express';
import { createDownload, getAllDownloads } from '../controllers/downloadController';
const router = express.Router();

router.get('/create', createDownload);
router.get('/get', getAllDownloads);



export default router;