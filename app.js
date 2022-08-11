const container = document.querySelector('.container');
const well = document.querySelector('.well');
const currentWord = document.querySelector('.current-word');
const nextStartBtn = document.querySelector('.next-start');
const inputField = document.querySelector('#inputField');
let score = document.querySelector('.score');

const words = ['Words ', 'Access ', 'Click ', 'Effect ', 'Coffee ', 'Celestial ', 'Sarcastic ', 'Brain ', 'Church ', 'Game ', 'Over ']

nextStartBtn.addEventListener('click', gamePlay);
let currentScore = 0;
let state = 0; // VARIABLE TO TRACK GAME STATE
let checker = 0; // VARIABLE TO TRACK TYPED LETTER

function gamePlay() {

    inputField.focus();
    inputField.value = '';

    if (state === 6) {

        currentWord.textContent = 'Game over, Press Start'
        nextStartBtn.style.display = 'initial';
        state = 0;
        currentScore = 0;
        score.textContent = currentScore;
        return;

    } else {
        if(well.children && state === 0) {
            well.innerHTML = ''; 
        }
        nextStartBtn.style.display = 'none';

        // CREATE CURRENT WORD TO TYPE
        let CurrentWordContainer = document.createElement('div');
        CurrentWordContainer.className = 'CurrentWordContainer';
        CurrentWordContainer.textContent = words[Math.floor(Math.random() * words.length)];
        well.appendChild(CurrentWordContainer);
        currentWord.textContent = CurrentWordContainer.textContent

        // VARIABLE TO TRACK THE MARGIN-TOP OF CURRENT WORD
        let wordPosition = 0;
        let gameProgress = setInterval(() => {

            wordPosition += 11;
            CurrentWordContainer.style.top = `${wordPosition}px`;
           
            if(currentWord.textContent.length === 1) {CurrentWordContainer.textContent = 'Press Space'}

            // IF WORD SUCCESSFULLY TYPED GO TO NEXT WORD
            if (currentWord.textContent === '') {

                well.removeChild(well.children[state]);
                clearInterval(gameProgress);
                currentScore += 10;
                score.textContent = currentScore;
                gamePlay();

            // IF WORD NOT TYPED .....
            } else if (CurrentWordContainer.style.top === `${187 - CurrentWordContainer.clientHeight * state}px`) {
                state++;
                
                currentScore -= 10;
                score.textContent = currentScore;
                clearInterval(gameProgress);
                CurrentWordContainer.style.backgroundImage = "linear-gradient(to top, blue, #fff, blue)";
                CurrentWordContainer.style.color = 'black'
                gamePlay();

            } 
    }, 600);

        inputField.addEventListener('input', checkInput);

        function checkInput() {
            if(inputField.value[checker] === currentWord.textContent[checker]) {

                let letterArray = currentWord.textContent.split('');
                letterArray.shift();
                let currentLetter = letterArray.join('');
                currentWord.textContent = currentLetter;
                inputField.value = '';
            } else {
                inputField.value = '';
            }
        }
    }    
}