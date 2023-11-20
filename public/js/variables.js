function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

var gold = 0;
var playerLevel = 1;
var playerExp = 0;
var username = getCookie("username");

var basicBlobLvl = 1;
var squishyBlobLvl = 0;
var slimeBlobLvl = 0;

function saveGameState() {
  var gameState = {
    gold: gold,
    playerLevel: playerLevel,
    playerExp: playerExp,
    username: username,
    basicBlobLvl: basicBlobLvl,
    squishyBlobLvl: squishyBlobLvl,
    slimeBlobLvl: slimeBlobLvl,
  };
  fetch("/save", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameState),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.status));
}

window.onload = function() {
    fetch('/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username}),
    })
    .then(response => response.json())
    .then(data => {
      gold = data.gold;
      playerLevel = data.playerLevel;
      playerExp = data.playerExp;
      basicBlobLvl = data.basicBlobLvl;
      squishyBlobLvl = data.squishyBlobLvl;
      slimeBlobLvl = data.slimeBlobLvl;
    });
  }