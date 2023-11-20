
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


function dealCards(){
    let deckLen = playerDeck.length;
    let randIndex = Math.floor(Math.random()*deckLen)
    playerHand.append(playerDeck[randIndex])
    }
    
    

    
    function drawHand() {
      for (let i = 0; i < playerHand.length; i++) {
        let curCard = playerHand[i];
        console.log(curCard);
        $(`#card` + i).html("")
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


    function updatePlayerHand(cardy, isPush){
        if(isPush){
          playerHand.push(cardy)
        }else{
          playerHand.splice(cardy,1)
        }
        drawHand()
        console.log(playerHand)
        }
        