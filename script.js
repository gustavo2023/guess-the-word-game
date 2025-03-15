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
let mistakes = [];

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
  createInputFields(currentWord.length);
  document.querySelector(".letter-input").focus();
};

const createInputFields = (length) => {
  for (let i = 0; i < length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.classList.add("letter-input");
    input.dataset.index = i;
    input.addEventListener("input", handleInput);
    inputBoxesContainer.appendChild(input);
  }
};

const checkInputLetter = (input, index) => {
  return input.value.toLowerCase() === currentWord[index];
};

const handleInput = (e) => {
  const input = e.target;
  const index = parseInt(input.dataset.index, 10);
  if (checkInputLetter(input, index)) {
    const nextInput = input.nextElementSibling;
    checkGameOver();
    if (input.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  } else {
    tries++;
    currentTriesSpan.textContent = tries;
    mistakes.push(input.value);
    mistakesList.textContent = `Mistakes: ${mistakes.join(", ")}`;
    triesCricles[tries - 1].classList.add("active");
    input.value = "";
    checkGameOver();
  }
};

const resetGame = () => {
  tries = 0;
  mistakes = [];
  currentTriesSpan.textContent = tries;
  inputBoxesContainer.innerHTML = "";
  mistakesList.innerHTML = "Mistakes:";
  triesCricles.forEach((circle) => circle.classList.remove("active"));
  generateRandomWord();
};

const checkGameOver = () => {
  if (tries === 5) {
    alert("Game Over! You Lose!");
    resetGame();
  } else {
    setTimeout(() => {
      const guessedWord = Array.from(inputs)
        .map((input) => input.value.toLowerCase())
        .join("");
      if (guessedWord === currentWord) {
        alert("Congratulations! You guessed the word!");
        resetGame();
      }
    }, 500);
  }
};

randomBtn.addEventListener("click", generateRandomWord);
resetBtn.addEventListener("click", resetGame);

// Initial setup
generateRandomWord();

const inputs = document.querySelectorAll(".letter-input");
inputs.forEach((input) => input.addEventListener("input", handleInput));
