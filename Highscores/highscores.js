// get list of highScoreList element
const highScoreList = document.getElementById('highScoresList');
// get list of highscores list from local storage or an empty string
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


// map through the scores return with html <li> and join with empty string and assign to the innertext of highScoresList
highScoreList.innerHTML = highScores.map( score => `<li class="high-score">${score.name}: ${score.score}</li>` );