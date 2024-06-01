const images = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🦄', '🐙', '🦓', '🐴', '🦢', '🦋', '🐬', '🐳', '🐢', '🦚', '🦜', '🦋', '🦞', '🦩', '🦨', '🦦', '🦥', '🦦'];

let cards = [];
let flippedCards = [];
let matchedCards = [];
let timer;

function generateCards(rows, columns) {
    const gridContainer = document.getElementById('gridContainer');
    cards = [];
    flippedCards = [];
    matchedCards = [];
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    const totalCards = rows * columns;
    let shuffledImages = images.slice(0, totalCards / 2).concat(images.slice(0, totalCards / 2));
    shuffledImages = shuffledImages.sort(() => Math.random() - 0.5);

    shuffledImages.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.innerText = '';
        card.addEventListener('click', flipCard);
        gridContainer.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        this.innerText = this.dataset.image;
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchedCards.push(firstCard, secondCard);
        if (matchedCards.length === cards.length) {
            endGame();
        }
    } else {
        firstCard.innerText = '';
        secondCard.innerText = '';
    }
    flippedCards = [];
}

function startTimer(duration) {
    const timeDisplay = document.getElementById('time');
    let timeLeft = duration;
    timeDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            endGame();
        } else {
            timeLeft--;
        }
    }, 1000);
}

function startGame(rows, columns) {
    const difficultyButtons = document.getElementById('difficulty');
    difficultyButtons.style.display = 'none';
    const instructions = document.getElementById('instructions');
    instructions.style.display = 'none';
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = `<p>Game started for ${rows}x${columns} grid</p>`;
    generateCards(rows, columns);
    startTimer(60);

    let endButton = document.getElementById('endButton');
    if (!endButton) {
        endButton = document.createElement('button');
        endButton.id = 'endButton';
        endButton.textContent = 'End Game';
        endButton.style.marginTop = '20px';
        endButton.addEventListener('click', endGame);
        const container = document.querySelector('.container');
        container.appendChild(endButton);
    } else {
        endButton.style.display = 'block';
    }
}

function endGame() {
    clearInterval(timer);
    const gridContainer = document.getElementById('gridContainer');
    const matchedCount = matchedCards.length / 2;
    const unmatchedCount = (cards.length / 2) - matchedCount;
    gridContainer.innerHTML = `<h2>Game Over</h2>
                                <p>Cards Matched: ${matchedCount}</p>
                                <p>Cards Left: ${unmatchedCount}</p>
                                <p><button onclick="showDifficulty()">Choose Difficulty</button></p>`;
    const endButton = document.getElementById('endButton');
    if (endButton) {
        endButton.style.display = 'none';
    }
    const timeDisplay = document.getElementById('time');
    timeDisplay.textContent = '60';
}

function showDifficulty() {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';
    const instructions = document.getElementById('instructions');
    instructions.style.display = 'block';
    const difficultyButtons = document.getElementById('difficulty');
    difficultyButtons.style.display = 'block';
    const endButton = document.getElementById('endButton');
    if (endButton) {
        endButton.style.display = 'none';
    }
}
