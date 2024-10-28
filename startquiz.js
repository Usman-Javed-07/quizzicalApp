 // Retrieve quiz data from localStorage
 const quizData = JSON.parse(localStorage.getItem("quizData"));

 function displayQuiz(quizData) {
   const quizContainer = document.getElementById("quiz-questions");
   quizContainer.innerHTML = "";

   quizData.forEach((questionData, index) => {
     const questionHTML = `
         <div class="quiz-question-container" id="quiz-questions">
       <div class="quiz-question">
         <div class="question">
           <h2>${index + 1}: ${questionData.question}</h2>
         </div>
         <div class="options">
           ${[
             ...questionData.incorrect_answers,
             questionData.correct_answer,
           ]
             .sort(() => Math.random() - 0.5)
             .map(
               (option, idx) => `
               <input type="radio" id="option${index}-${idx}" name="quiz${index}" value="${option}" />
               <label for="option${index}-${idx}" class="radio-label">${option}</label>`
             )
             .join("")}
         </div>
       </div>
       <hr />
           </div>
     `;
     quizContainer.innerHTML += questionHTML;
   });
 }

 if (quizData) {
   displayQuiz(quizData);
 } else {
   document.getElementById("quiz-questions").innerText =
     "No quiz data available.";
 }



