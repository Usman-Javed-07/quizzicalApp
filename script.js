// fetch quiz data form api

async function getData(api) {
    const API = await fetch(api);

    const data = await API.json();
    console.log(data);
    // displayQuiz(data);
    return data;
 
}


const quizzes = document.querySelectorAll ('.quizes');

quizzes.forEach(quiz =>{
  
   quiz.addEventListener('click' , function(e){
    let el = e.target.parentElement
    let category = el.getAttribute('data-category');
    console.log(category);

    if(category === 'Science: Computers') {
        
        getData('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple');
    } if(category === 'Entertainment: Music') {
        getData('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
    } if(category === 'Entertainment:Books') {
        getData('https://opentdb.com/api.php?amount=10');
    } if(category === 'Sports') {
        getData('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple');
    }
    
   });
});
//   function displayQuiz (quizData) {
//  let quizContainer = document.getElementsByClassName('quiz-question-container');
//  quizContainer.innerHTML ='';
// console.log(quizData)
// for(let i = 0 ; i<quizData.results.length; i++) {
    
//     let quizQuestions  = `
//     <div class="quiz-question">
//           <div class="question">
//             <h2>${i + 1}: ${quizData.results.question}</h2>
//           </div>
//           <div class="options">
            
//             ${quizData.results.incorrect_answers.map((option, idx) => `
//               <input type="radio" id="option${idx}" name="quiz${index}" value="${option}" />
//               <label for="option${idx}" class="radio-label">${option}</label>
//             `).join('')}
//           </div>
//         </div>
//         <hr />
//       `
//       console.log(quizQuestions);
//             }   
//   }




