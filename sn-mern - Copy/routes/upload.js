// import express from 'express';
// const router = express.Router();
// import cloudinary from 'cloudinary';
// import authenticateUser from '../middleware/auth.js';
// import fs from 'fs';

// cloudinary.config({
//   cloud_name: 'valkorn',
//   api_key: '243233463997649',
//   api_secret: '7X0gylRs-09JyoyrSwtsroFz4Go',
// });

// router.post('/upload', authenticateUser, (req, res) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0)
//       return res.status(400).json({ msg: 'No files were uploaded.' });

//     const file = req.files.file;
//     if (file.size > 1024 * 1024) {
//       removeTmp(file.tempFilePath);
//       return res.status(400).json({ msg: 'Size too large' });
//     }

//     if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
//       removeTmp(file.tempFilePath);
//       return res.status(400).json({ msg: 'File format is incorrect.' });
//     }
//     cloudinary.v2.uploader.upload(
//       file.tempFilePath,
//       { folder: 'test' },
//       async (err, result) => {
//         if (err) throw err;

//         removeTmp(file.tempFilePath);

//         res.json({ public_id: result.public_id, url: result.secure_url });
//       }
//     );
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

// router.post('/destroy', authenticateUser, (req, res) => {
//   try {
//     const { public_id } = req.body;
//     if (!public_id) return res.status(400).json({ msg: 'No images Selected' });

//     cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
//       if (err) throw err;

//       res.json({ msg: 'Deleted Image' });
//     });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

// const removeTmp = path => {
//   fs.unlink(path, err => {
//     if (err) throw err;
//   });
// };

// export default router;
