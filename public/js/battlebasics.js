// Creator: Ekærina
// Starter Enemy: Enslaved, Dim
// Intermediate Enemy: Warped, Gloom
// Advanced Enemy: Corrupted, Bright
// Gilded Enemy: Posessed, Radiant
// Boss Enemy: Tainted, Luminescent

//Player stats

var curwave = 0;
var playerLevel = 1;

let leEmbCard = new card("ember", 3, 2, "fire", 1);
let leFrostCard = new card("frost", 3, 2, "ice", 1);
let leShockCard = new card("shock", 3, 2, "lightning", 1);

//Player starts with 1 blob
var playerBlobTeam = ["basicBlob", "basicBlob", "basicBlob"];
var playerTeamMax = 3;

var overAllDifficulty = 1;

//Player starts with 5 cards
var playerHand = [leEmbCard, leEmbCard, leEmbCard, leEmbCard, leEmbCard];

//blobs
var blob0;
var blob1;
var blob2;

//enemies
var enemy0;
var enemy1;
var enemy2;
var enemySet = [];

function drawHand() {
  for (let i = 0; i < 5; i++) {
    let card = playerHand[i];
    let cardHTML =
      '<img src="images/' +
      card.name +
      '.png" ' +
      ' id="Image' +
      i +
      '" height = "150vh">';
    $(`#card` + i).html(cardHTML);
  }
}

//Creates enemies, of a certain type and number

function updateEnemySet(type, num) {
  for (let i = 0; i < num; i++) {
    if (type == "enslaved") {
      let enslaved = new enemy("enslaved", 15, 2, 1000, 0, 0);
      enemySet.push(enslaved);
    }
    if (type == "warped") {
      let warped = new enemy("warped", 20, 3, 1000, 0, 0);
      enemySet.push(warped);
    }
    if (type == "corrupted") {
      let corrupted = new enemy("corrupted", 25, 4, 1000, 0, 0);
      enemySet.push(corrupted);
    }
    if (type == "possessed") {
      let possessed = new enemy("possessed", 30, 5, 1000, 0, 0);
      enemySet.push(possessed);
    }
    if (type == "tainted") {
      let tainted = new enemy("tainted", 35, 6, 1000, 0, 0);
      enemySet.push(tainted);
    }
    if (type == "dim") {
      let dim = new enemy("dim", 15, 2, 1000, 0, 0);
      enemySet.push(dim);
    }
    if (type == "gloom") {
      let gloom = new enemy("gloom", 20, 3, 1000, 0, 0);
      enemySet.push(gloom);
    }
    if (type == "bright") {
      let bright = new enemy("bright", 25, 4, 1000, 0, 0);
      enemySet.push(bright);
    }
    if (type == "radiant") {
      let radiant = new enemy("radiant", 30, 5, 1000, 0, 0);
      enemySet.push(radiant);
    }
    if (type == "luminescent") {
      let luminescent = new enemy("luminescent", 35, 6, 1000, 0, 0);
      enemySet.push(luminescent);
    }
  }
  return enemySet;
}

//Clears the enemy set
function clearEnemySet() {
  enemySet = [];
}

//Selects an enemy when using cards
async function selectEnemy() {
  let userInput = await Swal.fire({
    title: "Choose a target",
    input: "select",
    inputOptions: {
      enemy0: "Enemy 1",
      enemy1: "Enemy 2",
      enemy2: "Enemy 3",
    },
    inputPlaceholder: "Select an enemy",
    showCancelButton: false,
    showConfirmButton: true,
    progressBar: false,
    timed: false,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value === "enemy0" || value === "enemy1" || value === "enemy2") {
          resolve();
        } else {
          resolve("You need to select an enemy");
        }
      });
    },
  });
  return userInput.value;
}

//Creates a blob, of a certain type
//type is the type of blob to create
//type is 0-2

function createBlob() {
  if (playerBlobTeam.contains("basicBlob")) {
    let basic = new basicBlob();
  }
}

function drawPlayerTeam() {
  for (i = 0; i < playerBlobTeam.length; i++) {
    console.log(i);
    if (i == 0) {
      blob0 = playerBlobTeam[i];
    } else if (i == 1) {
      blob1 = playerBlobTeam[i];
    } else {
      blob2 = playerBlobTeam[i];
    }
    let blob =
      '<img src="images/' + playerBlobTeam[i] + '.png" ' + ' id="Imageblob' + i + '" height = "100vh" width = "200vw">';
    $(`#blob` + i).html(blob);
    console.log(blob);
    console.log($(`#blob` + i).html());
  }
}

//Creates a battle

function startBattle() {
  Swal.fire({
    title: "???",
    text: "Opening a battle rift... Continue?",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Proceed",
    cancelButtonText: "Abort",
  }).then((result) => {
    if (result.value) {
      $("#PlayScreen").hide();
      $("#battle").show();
      //wait function in future maybe cuz studies
      //show that a loading screen makes people think smthng is happening
      createEncounter();
    } else {
      $("#PlayScreen").show();
      $("#battle").hide();
    }
  });
}

//Use player level to determine enemy level

function determineEnemyLevel(playerLevel) {
  let enemyLevel = playerLevel + Math.floor(Math.random() * 2);
  return enemyLevel;
}

// Use enemy level to determine enemy

function determineEnemy(enemyLevel) {
  let enemyType = Math.floor(Math.random() * 2);
  if (enemyLevel == 1) {
    if (enemyType == 0) {
      return "dim";
    } else {
      return "enslaved";
    }
  } else if (enemyLevel == 2) {
    if (enemyType == 0) {
      return "gloom";
    } else {
      return "warped";
    }
  } else if (enemyLevel == 3) {
    if (enemyType == 0) {
      return "bright";
    } else {
      return "corrupted";
    }
  } else if (enemyLevel == 4) {
    if (enemyType == 0) {
      return "radiant";
    } else {
      return "possessed";
    }
  } else if (enemyLevel == 5) {
    if (enemyType == 0) {
      return "luminescent";
    } else {
      return "tainted";
    }
  }
}

//Creates a wave
function createWave() {
  //clears enemy set
  clearEnemySet();
  //determines enemy level
  let enemyLevel = determineEnemyLevel(playerLevel);
  //3 enemies per wave
  let num = 3;
  //determines enemy type
  let enemyType = determineEnemy(enemyLevel);
  //updates enemy set
  updateEnemySet(enemyType, num);
  //increases overall difficulty
  overAllDifficulty += 1;
  //increases current wave
  curwave += 1;
  //updates the enemy health
  enemy0 = enemySet[0];
  enemy1 = enemySet[1];
  enemy2 = enemySet[2];
  //updates the wave number
  $("#waveNum").html("Wave: " + curwave);
}

//Creates an encounter
function createEncounter() {
  drawPlayerTeam();
  drawHand();
  createWave();

  setInterval(function () {
    $("#enemy0health").html("Health: " + enemy0.health);
    $("#enemy1health").html("Health: " + enemy1.health);
    $("#enemy2health").html("Health: " + enemy2.health);
  }, 100);
}
