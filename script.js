
async function getData() {
    const API = await fetch('https://opentdb.com/api.php?amount=40&category=18&difficulty=medium&type=multiple');

    const data = await API.json();
    console.log(data);
    return data;
 
}
getData();


