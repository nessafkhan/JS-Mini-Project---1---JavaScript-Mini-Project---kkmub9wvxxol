const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarFullText = document.getElementById('progressBarFull');
const scoreText = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let availableQuestions = [];
let score = 0;
let acceptingAnswers = false;
let questionCounter = 0;
let questions = [];

// https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple
// fetch data from the API (Trivia) on promise success map through each invidual loaded question and
// and format it to the question format.
// spread the incorrecct_answers from the loaded question to answerChoices and get the correct answer and splice it to the formattedQues.answer
// populate each choices and concatenate as per data-set 

fetch(
    'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
)
    .then( res => res.json())
    .then( loadedQuestions => {
        questions = loadedQuestions.results.map( loadedQuestion =>  {
           const formattedQuestion = {
               question : loadedQuestion.question,
           };

           const answerChoices = [...loadedQuestion.incorrect_answers];
           formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
           answerChoices.splice(
               formattedQuestion.answer -1,
               0,
               loadedQuestion.correct_answer
           );

           answerChoices.forEach( (choice, index) => {
            formattedQuestion['choice' + (index + 1)] = choice;
           });
           return formattedQuestion;
        });
        startGame();
    })
    .catch( (err) => {
        alert("Something went wrong! Try refresh...");
    });


// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    score = 0;
    questionCounter =0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('../End/end.html');
    }
    
    questionCounter++;
    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFullText.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach( choice => {
    choice.addEventListener('click', e => {
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(classToApply);
        if(classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000 );
    });
});

incrementScore = bonus => {
    score += bonus;
    scoreText.innerText = score;
};