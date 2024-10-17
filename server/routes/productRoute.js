const {
  createProduct,
  findProducts,
  findProduct,
  updateProductDetails,
  removeProduct,
  getPremiumProducts,
  latestArrivals,
} = require("../controllers/productController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });

// router
const router = require("express").Router();

// --------------------------
// premium products
router.get("/premium-products", getPremiumProducts, findProducts);
// --------------------------
// latest arrivals
router.get("/latest-arrivals", latestArrivals, findProducts);
// --------------------------
// find products
router.get("/", findProducts);
// find product
router.get("/:id", findProduct);

// --------------------------
router.use(authenticate);
router.use(authorize);
// create product
router.post("/create", upload.single("image"), createProduct);
// update product details
router.patch("/:id", upload.single("image"), updateProductDetails);
// delete product
router.delete("/:id", removeProduct);

module.exports = router;
