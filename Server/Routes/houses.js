import express from 'express';
import multer from 'multer';
import bucket from '../firebase.js';
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
import authenticateToken from '../middleware/middleware.js';
import House from '../Models/House.js';

router.post('/upload', upload.single('image'), async (req, res) => {
  const filename = Date.now() + '-' + req.file.originalname;
  console.log(filename);
  const file = bucket.file(filename);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });
  stream.end(req.file.buffer);
  stream.on('finish', async () => {
    // Make the file publicly accessible
    await file.makePublic();

    // Construct the public URL for the uploaded file
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    // Respond with the URL in JSON
    res.send({ url: publicUrl });
  });
  stream.on('error', (err) => {
    console.error(err);
    res.status(500).send('Upload error');
  });
});

router.post('/list', authenticateToken, async (req, res) => {
  try {
    const post = new House({
      for: req.body.for,
      name: req.body.name,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      parkingSpot: req.body.parkingSpot,
      furnished: req.body.furnished,
      address: req.body.address,
      offer: req.body.offer,
      price: req.body.price,
      discountedPrice: req.body.discountedPrice || null,
      url: req.body.url,
      owner: req.user.userId,
    });
    const savedUser = await post.save();
    return res.status(201).send({ success: true, data: post });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, data: error });
  }
});

router.get('/houses', async (req, res) => {
  try {
    const houses = await House.find();
    console.log('we got it');
    res.status(200).send({ success: true, data: houses });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Failed to fetch houses' });
  }
});

export default router;
