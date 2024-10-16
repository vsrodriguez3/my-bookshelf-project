let activeDiv = null;

export const setDiv = (newDiv) => {
  if (newDiv !== activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }
    newDiv.style.display = "block";
    activeDiv = newDiv;
  }
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

export let message = null;

import { showReviews, handleReviews } from "./reviews.js";
import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";
import { handleLogin } from "./login.js";
import { handleAddEdit } from "./addEdit.js";
import { handleRegister } from "./register.js";

document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("token");
  message = document.getElementById("message");

  handleLoginRegister(); // Handle login/register forms
  handleLogin(); // Handle login logic
  handleReviews(); // Handle reviews logic
  handleRegister(); // Handle registration logic
  handleAddEdit(); // Handle add/edit reviews logic

  if (token) {
    showReviews(); // Show reviews if user is logged in
  } else {
    showLoginRegister(); // Show login/register form if user is not logged in
  }
});
