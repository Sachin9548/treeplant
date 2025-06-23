const express = require("express");
const User = require("../models/User");
const router = express.Router();
const crypto = require("crypto");
const cloudinary = require("../config/cloudinary"); // Import Cloudinary config
const multer = require("multer");

// Configure Multer storage (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Generate a unique 8-character ID
const generateUniqueId = () => {
  return crypto.randomBytes(4).toString("hex"); // Generate a random 8-character hexadecimal string
};


const streamifier = require('streamifier');

// Helper: upload a Buffer to Cloudinary, return the secure_url
function uploadBufferToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

router.post("/join", async (req, res) => {
  const { fullName, collegeName, branch, mobileNumber, email } = req.body;
  if (!fullName || !collegeName || !branch || !mobileNumber || !email) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }
  try {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 15);
    const uniqueId = generateUniqueId();
    const newUser = new User({
      fullName,
      collegeName,
      branch,
      mobileNumber,
      email,
      uniqueId,
      startDate,
      endDate,
    });
    await newUser.save();
    res.status(200).json({
      message: "Joined successfully! Please Check Your Email For Further Process",
      uniqueId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// VERIFY (if ever needed)
router.get("/verify/:uniqueId", async (req, res) => {
  try {
    const user = await User.findOne({ uniqueId: req.params.uniqueId });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({
      fullName: user.fullName,
      collegeName: user.collegeName,
      branch: user.branch,
      mobileNumber: user.mobileNumber,
      email: user.email,
      workStatus: user.workStatus,
      isVerified: user.isVerified,
      paymentStatus: user.paymentStatus,
      startDate: user.startDate,
      endDate: user.endDate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put(
  '/upload-work-images/:uniqueId',
  upload.array('workImages', 15),
  async (req, res) => {
    try {
      const user = await User.findOne({ uniqueId: req.params.uniqueId });
      if (!user) return res.status(404).json({ error: 'User not found' });

      // upload each file, await the URL
      const urls = [];
      for (const file of req.files) {
        const url = await uploadBufferToCloudinary(file.buffer);
        urls.push(url);
      }

      user.workImages.push(...urls);
      await user.save();

      res.status(200).json({
        message: 'Work images sent for review.',
        user: { workImages: user.workImages }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// UPLOAD PAYMENT SCREENSHOT
router.put(
  '/upload-payment-screenshot/:uniqueId',
  upload.single('paymentScreenshot'),
  async (req, res) => {
    try {
      const user = await User.findOne({ uniqueId: req.params.uniqueId });
      if (!user) return res.status(404).json({ error: 'User not found' });

      // single file
      const url = await uploadBufferToCloudinary(req.file.buffer);
      user.paymentScreenshot = url;

      await user.save();

      res.status(200).json({
        message: 'Payment screenshot sent for review.',
        user: { paymentScreenshot: user.paymentScreenshot }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);


router.get('/dashboard/:uniqueId', async (req, res) => {
  try {
    const user = await User.findOne({ uniqueId: req.params.uniqueId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({
      workImages: user.workImages,
      workStatus: user.workStatus,
      isVerified: user.isVerified,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post("/login", async (req, res) => {
  const { email, uniqueId } = req.body;

  if (!email || !uniqueId) {
    return res
      .status(400)
      .json({ error: "Please provide both email and unique ID" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.uniqueId !== uniqueId) {
      return res.status(400).json({ error: "Invalid unique ID" });
    }
    res.status(200).json({
      message: "Login successful!",
      user: {
        fullName: user.fullName,
        email: user.email,
        uniqueId:user.uniqueId,
        workStatus: user.workStatus,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
