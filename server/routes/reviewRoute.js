const { createReview, getReviews } = require("../controllers/reviewController");
const { authenticate } = require("../middleware/authMiddleware");

const router = require("express").Router();

// -------------------------
// get reviews for a product
router.get("/:productId", getReviews);

// -------------------------
router.use(authenticate);
// create review
router.post("/:productId", createReview);

module.exports = router;
