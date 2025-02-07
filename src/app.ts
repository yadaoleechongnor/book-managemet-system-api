import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import connectDB from './utils/db';
import departmentRoutes from './routes/departmentRoutes';
import subjectDepartmentRoutes from './routes/subjectDepartmentRoutes';
import facultyRoutes from './routes/facultyRoutes';
import downloadRoutes from './routes/downloadRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/departments', departmentRoutes)
app.use('/subjectdeparments', subjectDepartmentRoutes)
app.use('/facultys', facultyRoutes)
app.use('/downloads', downloadRoutes)

connectDB();

export default app;