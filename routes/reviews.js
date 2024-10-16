// const express = require('express');
// const router = express.Router();
// const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');

// router.get('/', getAllJobs);
// router.get('/:id', getJob);
// router.post('/', createJob);
// router.put('/:id', updateJob);
// router.delete('/:id', deleteJob);

// router.route('/').post(createJob).get(getAllJobs);
// router.route('/:id').get(getJob).put(updateJob).delete(deleteJob).patch(updateJob);


// module.exports = router;






//----------------------------------------------------------------
const express = require('express');
const router = express.Router();
const { 
    getAllReviews, 
    getReview, 
    createReview, 
    updateReview, 
    deleteReview 
} = require('../controllers/reviews');

// Define routes for book reviews
router.route('/')
    .post(createReview) // Create a new review
    .get(getAllReviews); // Get all reviews by the logged-in user

router.route('/:id')
    .get(getReview) // Get a specific review by ID
    .put(updateReview) // Update a review
    .patch(updateReview) // Optionally, use PATCH for partial updates (if applicable)
    .delete(deleteReview); // Delete a review

module.exports = router;
