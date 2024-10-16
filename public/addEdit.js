
import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showReviews } from "./reviews.js"; 

let addEditDiv = null;
let bookTitle = null;
let reviewText = null;
let rating = null;
let addingReview = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-review");
  bookTitle = document.getElementById("bookTitle");
  reviewText = document.getElementById("reviewText");
  rating = document.getElementById("rating");
  addingReview = document.getElementById("adding-review");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingReview) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/reviews";

        if (addingReview.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/reviews/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              bookTitle: bookTitle.value,
              reviewText: reviewText.value,
              rating: rating.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The review entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The review entry was created.";
            }

            bookTitle.value = "";
            reviewText.value = "";
            rating.value = "5"; // Default
            showReviews(); // Update reviews list
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showReviews(); // Cancel and return to review list
      }
    }
  });
};

export const showAddEdit = async (reviewId) => {
  if (!reviewId) {
    bookTitle.value = "";
    reviewText.value = "";
    rating.value = "5"; 
    addingReview.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        bookTitle.value = data.review.bookTitle;
        reviewText.value = data.review.reviewText;
        rating.value = data.review.rating;
        addingReview.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = reviewId;

        setDiv(addEditDiv);
      } else {
        message.textContent = "The review entry was not found";
        showReviews();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showReviews();
    }

    enableInput(true);
  }
};
