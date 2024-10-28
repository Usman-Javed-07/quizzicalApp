
async function getData(api) {
  const API = await fetch(api);
  const data = await API.json();
  // Store data in localStorage
  localStorage.setItem("quizData", JSON.stringify(data.results));
  // Navigate to startquiz page
  window.location.href = "startquiz.html";
}

const quizzes = document.querySelectorAll('.quizes');
quizzes.forEach((quiz) => {
  quiz.addEventListener('click', function (e) {
    let el = e.target.closest(".quizes");
    let category = el.getAttribute('data-category');
    if (category === 'Science: Computers') {
      getData('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple');
    } else if (category === 'Entertainment: Music') {
      getData('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
    } else if (category === 'Animals') {
      getData('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple');
    } else if (category === 'Sports') {
      getData('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple');
    }
  });
});



