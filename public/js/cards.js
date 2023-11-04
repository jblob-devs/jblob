
//Player draws a card every 4 seconds
var playerDrawDelay = 4000;

//Max of 3 cards in hand
var playerMaxHandSize = 3;


var playerDeck = ["ember"];
//represents the players deck, (they start with only card, ember)

//There is a doc with the card's effect and list

var playerHand = [];
//represents the cards in the player's hand

//changes to true if the user has a card selected, usually when the programs needs an user input to continue.
var selectState = false;

function dealNewCard(){
    let deckLength = playerDeck.length()
    let randy = Math.floor(Math.random() * deckLength) - 1;
    playerHand.push[playerDeck[randy]];
}
