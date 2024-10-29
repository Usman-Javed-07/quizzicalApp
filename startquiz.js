
// Retrieve quiz data from localStorage
const quizData = JSON.parse(localStorage.getItem("quizData"));

let currentPage = 1;
const questionsPerPage = 5;

const userAnswers = Array(quizData.length).fill(null); 

function displayQuiz(quizData) {
  const quizContainer = document.getElementById("quiz-questions");
  quizContainer.innerHTML = "";

  // Calculate start and end index for questions on the current page
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, quizData.length);

  // Display only questions for the current page
  quizData.slice(startIndex, endIndex).forEach((questionData, index) => {
    const questionIndex = startIndex + index; 
    const questionHTML = `
      <div class="quiz-question-container">
        <div class="quiz-question">
          <div class="question">
            <h2>${questionIndex + 1}: ${questionData.question}</h2>
          </div>
          <div class="options">
            ${[...questionData.incorrect_answers, questionData.correct_answer]
              .sort(() => Math.random() - 0.5)
              .map(
                (option, idx) => `
                <input type="radio" id="option${questionIndex}-${idx}" name="quiz${questionIndex}" value="${option}"
                  ${userAnswers[questionIndex] === option ? "checked" : ""} />
                <label for="option${questionIndex}-${idx}" class="radio-label">${option}</label>`
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

// Capture the user's answers on the current page
function captureAnswers() {
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, quizData.length);

  for (let i = startIndex; i < endIndex; i++) {
    const selectedOption = document.querySelector(`input[name="quiz${i}"]:checked`);
    userAnswers[i] = selectedOption ? selectedOption.value : null;
  }
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
    document.getElementById("check-answer-btn").style.display = "none"; 
    document.getElementById("prev-btn").style.display = "none"; 
    displayResults();
    document.getElementById("go-back-to-start-again").style.display = "block"; 
  });

  
// Display results on a new page
function displayResults() {
  const quizContainer = document.getElementById("quiz-questions");
  quizContainer.innerHTML = "";

  let correctCount = 0;


  quizData.forEach((questionData, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === questionData.correct_answer;
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
              .map(option => {
                // Set colors based on user's answer
                let backgroundColor = "";
                if (option === questionData.correct_answer) {
                  backgroundColor = userAnswer === option ? "#94d7a2" : "#94d7a2"; 
                } else if (userAnswer === option) {
                  backgroundColor = "#f8bcbc"; 
                }
                return `<label class="radio-label" style="background-color: ${backgroundColor};">${option}</label>`;
              })
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
