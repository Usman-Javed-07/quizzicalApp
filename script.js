// fetch quiz data form api

async function getData(api) {
    const API = await fetch(api);

    const data = await API.json();
    console.log(data);
    return data;
 
}


const quizzes = document.querySelectorAll ('.quizes');

quizzes.forEach(quiz =>{
  
   quiz.addEventListener('click' , function(e){
    let el = e.target.parentElement
    let category = el.getAttribute('data-category')
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

let quizQuestions = `
      <div class="quiz-question-container">
      <div class="quiz-quesiton">
        <div class="question">
          <h2> ${}</h2>
        </div>

        <div class="options">
          <input type="radio" id="option1" name="quiz" value="jelly" />
          <label for="option1" class="radio-label">${}</label>

          <input type="radio" id="option2" name="quiz" value="lollipop" />
          <label for="option2" class="radio-label">${}</label>

          <input type="radio" id="option3" name="quiz" value="nutella" />
          <label for="option3" class="radio-label">${}</label>

          <input type="radio" id="option4" name="quiz" value="froyo" />
          <label for="option4" class="radio-label">${}</label>
        </div>
      </div>
      <hr />
    </div>     

`
