
// Retrieve quiz data from localStorage
const quizData = JSON.parse(localStorage.getItem("quizData"));

let currentPage = 1;
const questionsPerPage = 5;

const userAnswers = [];

function displayQuiz(quizData) {
  const quizContainer = document.getElementById("quiz-questions");
  quizContainer.innerHTML = "";

//    calculate start and end index
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, quizData.length);

  // Display only questions for the current page
  quizData.slice(startIndex, endIndex).forEach((questionData, index) => {
    const questionHTML = `
      <div class="quiz-question-container">
        <div class="quiz-question">
          <div class="question">
            <h2>${startIndex + index + 1}: ${questionData.question}</h2>
          </div>
          <div class="options">
            ${[
              ...questionData.incorrect_answers,
              questionData.correct_answer,
            ]
              .sort(() => Math.random() - 0.5)
              .map(
                (option, idx) => `
                <input type="radio" id="option${startIndex + index}-${idx}" name="quiz${startIndex + index}" value="${option}" />
                <label for="option${startIndex + index}-${idx}" class="radio-label">${option}</label>`
              )
              .join("")}
          </div>
        </div>
        <hr />
      </div>
    `;
    quizContainer.innerHTML += questionHTML;
  });

  // Show or hide buttons based on page
  document.getElementById("prev-btn").style.display = currentPage === 1 ? "none" : "inline";
  document.getElementById("next-btn").style.display = endIndex >= quizData.length ? "none" : "inline";
  document.getElementById("check-answer-btn").style.display = endIndex >= quizData.length ? "inline" : "none";
}

// Capture the user's answers
function captureAnswers() {
  quizData.forEach((questionData, index) => {
    const selectedOption = document.querySelector(`input[name="quiz${index}"]:checked`);
    userAnswers[index] = selectedOption ? selectedOption.value : null;
  });
}

// Event listeners for Next and Previous buttons
document.getElementById("next-btn").addEventListener("click", () => {
  captureAnswers();
  if (currentPage * questionsPerPage < quizData.length) {
    currentPage++;
    displayQuiz(quizData);
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  captureAnswers();
  if (currentPage > 1) {
    currentPage--;
    displayQuiz(quizData);
  }
});

// Event listener for Check Answers button
document.getElementById("check-answer-btn").addEventListener("click", () => {
  captureAnswers();
  displayResults();
});

// Display results on a new page
function displayResults() {
  const quizContainer = document.getElementById("quiz-questions");
  quizContainer.innerHTML = "";

  let correctCount = 0;

  quizData.forEach((questionData, index) => {
    const isCorrect = userAnswers[index] === questionData.correct_answer;
    if (isCorrect) correctCount++;

    const questionHTML = `
      <div class="quiz-question-container">
        <div class="quiz-question">
          <div class="question">
            <h2>${index + 1}: ${questionData.question}</h2>
          </div>
          <div class="options">
            ${[...questionData.incorrect_answers, questionData.correct_answer]
              .sort((a, b) => a.localeCompare(b))
              .map(option => `
                <label class="radio-label" style="background-color: ${
                  option === questionData.correct_answer ? '#94d7a2' : userAnswers[index] === option ? '#f8bcbc' : ''
                };">${option}</label>`
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
    quizContainer.innerHTML += questionHTML;
  });

  quizContainer.innerHTML += `<h3>You Scored: ${correctCount} / ${quizData.length} correct answers</h3>`;
}

if (quizData) {
  displayQuiz(quizData);
} else {
  document.getElementById("quiz-questions").innerText = "No quiz data available.";
}



