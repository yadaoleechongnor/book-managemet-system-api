import express from 'express';
import { uploadBook, updateBook, deleteBook, getAllBooks, searchBooks  } from '../controllers/bookController';
import multer from 'multer';

// const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files in "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('book_file'), uploadBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.get('/', getAllBooks);
router.get('/search', searchBooks);

export default router;