const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  orderTranscript,
  viewTranscript,
  approveTranscript,
  deleteTranscript,
} = require("../controllers/transcriptController");

router.route("/ordertranscript").post(protect, orderTranscript);
router.route("/viewtranscript").post(protect, viewTranscript);
router.route("/approvetranscript/:prn").put(protect, approveTranscript);
router.route("/deletetranscript/:prn").post(protect, deleteTranscript);

module.exports = router;
