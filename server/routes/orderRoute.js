const router = require("express").Router();

const {
  createOrder,
  getOrders,
  updateProductList,
  removeOrder,
} = require("../controllers/orderController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.get("/", authenticate, authorize, getOrders);
router.post("/", authenticate, updateProductList, createOrder);
router.delete("/:id", authenticate, authorize, removeOrder);

// export
module.exports = router;
