// const quizData = JSON.parse(localStorage.getItem('quizData'));

// function displayData(quizData) {
//     const quizContainer = document.getElementById('quiz-questions');
//     quizContainer.innerHTML='';

// quizData.forEach((questionData, index) => {
//   const containerHTML = ` 
      
//       <div class="quiz-quesiton">
//         <div class="question">
//           <h2>${index + 1}: ${questionData.question}</h2>
//         </div>

//         <div class="options">
//         ${[
//             ...questionData.incorrect_answers,
//             questionData.correct_answer,
//         ]
//           .sort(() => Math.random() - 0.5)
//           .map((idx, option) => `
          
//            <input type="radio" id="option${index}-${idx}" name="quiz${index}" value="${option}" />
//           <label for="option${index}-${idx}" class="radio-label">${option}</label>`
//     )
//     .join('')
// }
//         </div>
//       </div>
//       <hr />
//   `;
//   quizContainer.innerHTML= containerHTML;
// });
// }

// if(quizData) {
//     displayData(quizData);
// } else {
//     document.getElementById ('quiz-questions').innerHTML = ' no data found'
// }