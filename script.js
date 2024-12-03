
let arr = [
    "images/img1.jpg",
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
    "images/img6.jpg",
];


arr.sort(() => Math.random() - 0.5);

let shutter = "images/shutter.webp";

let clickCount = 0;
let firstCard = null;
let secondCard = null;
let openCards = new Set(); 
let totalMatches = 0; 
let isProcessing = false; 

function revealCard(imgID, index) {
    if (isProcessing) return; 

    
    if (openCards.has(imgID) || (firstCard && firstCard.id === imgID)) {
        return;
    }

    
    let imageClicked = document.getElementById(imgID);
    imageClicked.src = arr[index];
    imageClicked.classList.add("flipped");

   
    if (clickCount === 0) {
        firstCard = { id: imgID, index: index };
        clickCount++;
    } else if (clickCount === 1) {
        secondCard = { id: imgID, index: index };
        clickCount++;
        isProcessing = true; 
      
        setTimeout(() => {
            validateCards();
        }, 1000);
    }
}

function validateCards() {
    if (arr[firstCard.index] === arr[secondCard.index]) {
        
        openCards.add(firstCard.id);
        openCards.add(secondCard.id);
        totalMatches++;

       
        if (totalMatches === arr.length / 2) {
            setTimeout(() => {
                showWinMessage();
            }, 500);
        }
    } else {
        
        closeCard(firstCard.id);
        closeCard(secondCard.id);
    }

    
    firstCard = null;
    secondCard = null;
    clickCount = 0;
    isProcessing = false; 
}

function closeCard(cardID) {
    if (!openCards.has(cardID)) {
        let card = document.getElementById(cardID);
        card.src = shutter;
        card.classList.remove("flipped");
    }
}

function showWinMessage() {
    const messageContainer = document.createElement("div");
    messageContainer.id = "winMessage";
    messageContainer.innerHTML = `
        <h2>You're a Nigga!</h2>
        <button onclick="restartGame()">Play Again</button>
    `;
    document.body.appendChild(messageContainer);
}

function restartGame() {
    location.reload();
}
