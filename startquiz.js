 // Retrieve quiz data from localStorage
 const quizData = JSON.parse(localStorage.getItem("quizData"));
 let currentPage = 1;
 let questionPerPage = 5;

 function displayQuiz(quizData) {
   const quizContainer = document.getElementById("quiz-questions");
   quizContainer.innerHTML = "";

//    calculate start and end index
const startIndex = (currentPage - 1) * questionPerPage;
const endIndex = Math.min(startIndex + questionPerPage, quizData.length);

//  display only 5 question on current page 

   quizData.slice(startIndex, endIndex).forEach((questionData, index) => {
     const questionHTML = `
         <div class="quiz-question-container" id="quiz-questions">
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

//    update button showing
document.getElementById('prev-btn').style.display = currentPage === 1 ? 'none' : 'inline'
document.getElementById('next-btn').style.display = endIndex >= quizData.length ? 'none':'inline';
 }
//  addEventListner for next and prev button 

document.getElementById('next-btn').addEventListener('click' , ()=> {
    if(currentPage * questionPerPage < quizData.length) {
        currentPage++;
        displayQuiz(quizData);
    }
});

document.getElementById('prev-btn').addEventListener('click', ()=> {
    if (currentPage > 1) {
        currentPage--;
        displayQuiz(quizData);
    }
});

 if (quizData) {
   displayQuiz(quizData);
 } else {
   document.getElementById("quiz-questions").innerText =
     "No quiz data available.";
 }





