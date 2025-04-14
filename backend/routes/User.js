const router = require("express").Router();
const { login, register } = require("../controllers/User");
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const client = new OAuth2Client("825374434980-p332hjtlqf2glv9d0puotm4n6tsg8l74.apps.googleusercontent.com");

router.post("/register", register);
router.post("/login", login);
router.post('/google-login', async (req, res) => {
    const { token } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "YOUR_GOOGLE_CLIENT_ID",
      });
      const { name, email } = ticket.getPayload();
  
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({ name, email, password: "google" }); // dummy password or use OAuth-only logic
      }
  
      const jwtToken = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token: jwtToken });
    } catch (err) {
      console.error("Google Auth Error:", err);
      res.status(401).json({ message: "Google login failed" });
    }
  });
module.exports = router;
    