/**
 * User routes / auth
 * host + /api/auth
 */

const { Router } = require("express");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/field-validator");
const router = Router();

router.post(
  "/new",
  [
    // Middleware
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

router.get("/renew", revalidateToken);

module.exports = router;
