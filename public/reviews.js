import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";
import { handleDeleteReview } from "./deleteReview.js";

let reviewsDiv = null;
let reviewsTable = null;
let reviewsTableHeader = null;

export const handleReviews = () => {
  reviewsDiv = document.getElementById("reviews");
  const logoff = document.getElementById("logoff");
  const addReview = document.getElementById("add-review");
  reviewsTable = document.getElementById("reviews-table");
  reviewsTableHeader = document.getElementById("reviews-table-header");

  reviewsDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addReview) {
        showAddEdit(null);
      } else if (e.target.classList.contains("deleteButton")) {
        const reviewId = e.target.dataset.id;
        handleDeleteReview(reviewId);
      } else if (e.target === logoff) {
        setToken(null);
        message.textContent = "You have been logged off.";
        reviewsTable.replaceChildren([reviewsTableHeader]);
        showLoginRegister();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      }
    }
  });
};

export const showReviews = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/reviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [reviewsTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        reviewsTable.replaceChildren(...children);
      } else {
        for (let i = 0; i < data.reviews.length; i++) {
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.reviews[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.reviews[i]._id}>delete</button></td>`;
          let rowHTML = `
              <td>${data.reviews[i].bookTitle}</td> 
              <td>${data.reviews[i].reviewText}</td>
              <td>${data.reviews[i].rating}</td>
              <div>${editButton}${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        reviewsTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
  setDiv(reviewsDiv);
};
