const asyncHandler = require("express-async-handler");
const Transcript = require("../models/transcriptModel");

const orderTranscript = asyncHandler(async (req, res) => {
  const { fname, lname, prn, dob, cpi } = req.body;
  let isVerified = true;
  if (!fname || !lname || !prn || !dob || !cpi) {
    res.status(400);
    throw new Error("All fields are required");
  } else {
    const transcriptData = await Transcript.find({ prn });
    if (transcriptData.length !== 0) {
      res.status(400);
      throw new Error("Order Already Exists");
    } else {
      const transcript = new Transcript({
        user: req.user._id,
        fname,
        lname,
        prn,
        dob,
        cpi,
      });

      const data = await transcript.save();
      res.status(201).json(data);
    }
  }
});

const viewTranscript = asyncHandler(async (req, res) => {
  const transcriptData = await Transcript.find();
  if (transcriptData.length == 0) {
    res.status(400);
    throw new Error("No Transcript Found");
  }
  res.status(201).json(transcriptData);
});

const approveTranscript = asyncHandler(async (req, res) => {
  const prn = req.params.prn;
  console.log(prn);
  if (!prn) {
    res.status(400);
    throw new Error("Enter PRN");
  } else {
    const updateData = await Transcript.updateOne({ prn }, { status: true });
    const transcriptData = await Transcript.find({ prn });
    res.status(201).json(transcriptData[0]);
  }
});

const deleteTranscript = asyncHandler(async (req, res) => {
  const prn = req.params.prn;
  console.log(prn);
  if (!prn) {
    res.status(400);
    throw new Error("Enter PRN");
  } else {
    const updateData = await Transcript.deleteOne({ prn });
    const transcriptData = await Transcript.find({ prn });
    res.status(201).json(transcriptData);
  }
});

module.exports = {
  orderTranscript,
  viewTranscript,
  approveTranscript,
  deleteTranscript,
};
