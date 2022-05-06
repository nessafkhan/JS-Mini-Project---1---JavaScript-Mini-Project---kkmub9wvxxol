const showScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
showScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e =>{
    e.preventDefault();
};