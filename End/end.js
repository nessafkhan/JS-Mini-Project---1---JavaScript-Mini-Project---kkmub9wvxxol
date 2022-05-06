const showScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');

showScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORE = 5;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e =>{
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScore', JSON.stringify(highScores));
    window.location.assign('/');
};