import express from 'express';
const app = express();
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';

dotenv.config();

import 'express-async-errors';
import morgan from 'morgan';

//db and authuser
import connectDB from './db/connect.js';

//routes
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log('Server is running');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
