const {
  initializePayment,
  verifyPayment,
} = require("../controllers/paymentController");
const { authenticate } = require("../middleware/authMiddleware");

const router = require("express").Router();

// create access_code
router.post("/initialize", authenticate, initializePayment);

// verify payment
router.get("/verify/:ref", authenticate, verifyPayment);

module.exports = router;
