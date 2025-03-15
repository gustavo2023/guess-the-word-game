const scrambledWordBox = document.querySelector(".scrambled-word-box");
const currentTriesSpan = document.getElementById("current-tries");
const triesCricles = document.querySelectorAll(".try-circle");
const mistakesList = document.getElementById("mistakes-list");
const inputBoxesContainer = document.querySelector(".input-boxes-container");
const randomBtn = document.getElementById("random-btn");
const resetBtn = document.getElementById("reset-btn");

const words = ["example", "javascript", "coding", "challenge"];
let currentWord = "";
let tries = 0;
let mistakes = 0;

const scrambledWord = (word) => {
  let array = word.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
};

const generateRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  scrambledWordBox.textContent = scrambledWord(currentWord);
};

const createInputFields = (length) => {
  for (let i = 0; i < length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.classList.add("letter-input");
    inputBoxesContainer.appendChild(input);
  }
};
