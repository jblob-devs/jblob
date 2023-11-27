//Player draws a card every 4 seconds
playerDrawDelay = 4000;

//Max of 3 cards in hand
playerMaxHandSize = 3;

playerDeck = ["ember"];
//represents the players deck, (they start with only card, ember)

//There is a doc with the card's effect and list

var playerHand = [];
//represents the cards in the player's hand

//changes to true if the user has a card selected, usually when the programs needs an user input to continue.
var selectState = false;

function dealCards() {
  let deckLen = playerDeck.length;
  let randIndex = Math.floor(Math.random() * deckLen);
  playerHand.push(playerDeck[randIndex]);
}

//draws the players new hand (does not DRAW a new card, like physically draws the card on the screen)
function drawHand() {
  console.log(playerHand.length)
  $(`#card0`).html("");
  $(`#card1`).html("");
  $(`#card2`).html("");
  for (let i = 0; i < playerHand.length; i++) {
    let curCard = playerHand[i];
    $(`#card` + i).html("");
    let cardHTML =
      '<span id="card' +
      i +
      '"  onmouseleave=$("#card' +
      i +
      'Info").hide(); onmouseenter=$("#card' +
      i +
      'Info").show();>' +
      '<p id="card' +
      i +
      'Info" class="cardInfo">' +
      curCard.descrip +
      "</p>" +
      '<img src="images/' +
      curCard.name +
      '.png" ' +
      ' id="card' +
      i +
      "img" +
      '" height = "150vh" class="cardImg" onclick=' +
      curCard.varName +
      ".useCard()>" +
      "</span>";
    $(`#card` + i).html(cardHTML);
    $(`#card` + i + "Info").hide();
  }
}

//Deals a new card and draws the players hand after a short wait duration
function dealCard(){
  wait(playerDrawDelay).then(() => { 
    if(playerHand.length < playerMaxHandSize){
      dealCards();
      drawHand();
      console.log("dealt card");
    }
  });
}


//A wait function that allows the javascript to wait for a bit before continuing
function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

