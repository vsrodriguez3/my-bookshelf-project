



import { enableInput, message, token } from "./index.js";
import { showReviews } from "./reviews.js"; 

export const handleDeleteReview = async (reviewId) => { 
  enableInput(false);

  try {
    const response = await fetch(`/api/v1/reviews/${reviewId}`, { 
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      message.textContent = "Review successfully deleted."; 
      showReviews(); 
    } else {
      message.textContent = "Failed to delete review."; 
      showReviews(); 
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred."; 
    showReviews(); 
  }

  enableInput(true);
};
