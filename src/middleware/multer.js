import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Specify the folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) =>
      `${file.originalname.split(".")[0]}-${Date.now()}`,
  },
});

const upload = multer({ storage: storage });

export { cloudinary };
export { upload };



// cloudinary.v2.api
//   .delete_resources(['uploads/Skype_Picture_2023_12_13T06_59_41_213Z-1702624422078'], 
//     { type: 'upload', resource_type: 'image' })
//   .then(console.log);
