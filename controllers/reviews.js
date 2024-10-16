const Review = require("../models/Review");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// Get all reviews by the logged-in user
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({ reviewer: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

// Get a single review by the logged-in user
const getReview = async (req, res) => {
  const {
    user: { userId },
    params: { id: reviewId },
  } = req;

  const review = await Review.findOne({
    _id: reviewId,
    reviewer: userId,
  });

  if (!review) {
    throw new NotFoundError(`No review with id : ${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

// Create a new review
const createReview = async (req, res) => {
  req.body.reviewer = req.user.userId; // Attach the logged-in user's ID as the reviewer
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

// Update an existing review
const updateReview = async (req, res) => {
  const {
    body: { bookTitle, reviewText, rating },
    user: { userId },
    params: { id: reviewId },
  } = req;

  // Ensure that the required fields are not empty
  if (!bookTitle || !reviewText || !rating) {
    throw new BadRequestError(
      "Book title, review text, and rating cannot be empty"
    );
  }

  const review = await Review.findByIdAndUpdate(
    { _id: reviewId, reviewer: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!review) {
    throw new NotFoundError(`No review with id : ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

// Delete an existing review
const deleteReview = async (req, res) => {
  const {
    user: { userId },
    params: { id: reviewId },
  } = req;

  const review = await Review.findOneAndDelete({
    _id: reviewId,
    reviewer: userId,
  });

  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "The review was deleted." });
};

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
