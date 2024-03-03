import userModel from "../models/userModel.js";

export const getUserController = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .select("-password")
      .select("-answer");
    res.status(200).send({
      success: true,
      message: "All users",
      total: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting all users",
      error,
    });
  }
};

export const getReviewController = async (req, res) => {
  try {
    const reviews = await userModel
      .find(
        { review: { $exists: true, $ne: null } }, // Filter out users without a review
        { review: 1, name: 1, _id: 0 }
      )
      .sort({ createdAt: -1 }); // Assuming you have a 'createdAt' timestamp field

    res.status(200).send({
      success: true,
      message: "Reviews Fetched Successfully",
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Reviews",
      error,
    });
  }
};

export const addReviewController = async (req, res) => {
  try {
    const { review } = req.fields;

    // Assume you have some way to identify the user, e.g., through authentication
    const userId = req.user._id; // Adjust this based on your authentication setup

    // Find the user by their ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update the user's review field
    user.review = review;

    // Save the updated user document
    await user.save();

    res.status(200).send({
      success: true,
      message: "Review Added Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Adding Review",
      error,
    });
  }
};

export const addReplyController = async (req, res) => {
  try {
    const { reply } = req.fields;
    const id = req.user._id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    user.reply = reply;
    // Save the updated user document
    await user.save();

    res.status(200).send({
      success: true,
      message: "Review Added Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Replying",
      error,
    });
  }
};
