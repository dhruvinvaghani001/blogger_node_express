import {v2 as cloudinary} from "cloudinary";
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

// Multer and Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Specify the folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `${file.originalname.split('.')[0]}-${Date.now()}`
  }
});

const upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), (req, res) => {
  // Access the Cloudinary URL of the uploaded image
  const imageUrl = req.file.path;

  res.json({ imageUrl });
});

