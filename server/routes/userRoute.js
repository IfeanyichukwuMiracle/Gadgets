const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUserDetails,
  updateUserPassword,
  deleteUser,
} = require("../controllers/userController");
const {
  signup,
  login,
  logout,
  loginAdmin,
} = require("../controllers/authController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// ---------------------------
// create user
router.post("/create", authenticate, authorize, createUser);

// ---------------------------
// signup
router.post("/signup", signup);
// login
router.post("/login", login);
// login admin
router.post("/login/admin", loginAdmin);

// ---------------------------
// get all users
router.get("/", getUsers);

// ---------------------------
router.use(authenticate);
// logout
router.get("/logout", logout);
// get user
router.get("/:userId", getUser);
// update user details
router.patch("/:userId", updateUserDetails);
// update user password
router.patch("/password/:userId", updateUserPassword);
// delete user
router.patch("/delete/:userId", deleteUser);

module.exports = router;
