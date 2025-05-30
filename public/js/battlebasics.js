// Creator: 𐤃kʊrin (Pronounced Dakurin)
// Starter Enemy: Enslaved, Dim
// Intermediate Enemy: Warped, Gloom
// Advanced Enemy: Corrupted, Bright
// Gilded Enemy: Posessed, Radiant
// Boss Enemy: Tainted, Luminescent

//Player stats

var curwave = 0;
var won = false;


let EmberCard = new card(
  "ember",
  "EmberCard",
  30,
  3,
  "fire",
  1,
  true,
  "enemyone",
  "Shoots a mildly hot ember. Does 30 damage on hit."
);

let HealCard = new card(
  "heal",
  "HealCard",
  80,
  2,
  "none",
  1,
  true,
  "friendone",
  "Heals the vitality of an ally. Heals 20 health."
);

var basic_Blob = new basicBlob()
var squishy_Blob = new squishyBlob()
var slime_Blob = new slimeBlob()
//Player starts with 1 blob
var playerBlobTeam = ["basicBlob", "slimeBlob", "squishyBlob"];
var playerBlobTeamTemp = ["basicBlob", "slimeBlob", "squishyBlob"];
var playersTeam = ["basicBlob", "slimeBlob", "squishyBlob"];
var playerDeck = [EmberCard, HealCard];
let playerTeamMax = 3;
let maxHandSize = 3;
let maxManaCap = 10;
let curMana = 0;
let manaIncrement = 1;
let manaIncreaseTime = 1000;
//can be increased

var overAllDifficulty = 1;

//Player starts with 3 cards
var playerHand = [EmberCard, HealCard, EmberCard];
var playerHandTemp = [EmberCard, HealCard, EmberCard];

//blobs
var blob0;
var blob1;
var blob2;

//enemies
var enemy0;
var enemy1;
var enemy2;
var enemySet = [];

//Creates enemies, of a certain type and number
//name health basicatkdmg basicatkspd specialatk dmg special atk spd
function updateEnemySet(type, num) {
  for (let i = 0; i < num; i++) {
    //the culled
    if (type == "enslaved") {
      let enslaved = new enemy("enslaved", 100, 10, 1500, 0, 0);
      enemySet.push(enslaved);
    }
    if (type == "warped") {
      let warped = new enemy("warped", 150, 13, 1500, 0, 0);
      enemySet.push(warped);
    }
    if (type == "corrupted") {
      let corrupted = new enemy("corrupted", 150, 50, 3000, 0, 0);
      enemySet.push(corrupted);
    }
    if (type == "possessed") {
      let possessed = new enemy("possessed", 250, 30, 1790, 0, 0);
      enemySet.push(possessed);
    }
    if (type == "tainted") {
      //Lidoially 1984
      let tainted = new enemy("tainted", 350, 60, 1984, 0, 0);
      enemySet.push(tainted);
    }

  }
  return enemySet;
}

//Clears the enemy set
function clearEnemySet() {
  enemySet = [];
}

async function selectEnemy() {
  return new Promise(async (resolve) => {
    $("#optionE1").show();
    $("#optionE2").show();
    $("#optionE3").show();
    await hideButtons();
    Toast.fire({
      title: "Choose a target",
      html: `
        <button id="optionE1" class="swal2-confirm swal2-styled">Enemy 1</button>
        <button id="optionE2" class="swal2-confirm swal2-styled">Enemy 2</button>
        <button id="optionE3" class="swal2-confirm swal2-styled">Enemy 3</button>
      `,
      timer: 25000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCancelButton: false,
      position: "bottom-right",
    });
    document.addEventListener('keydown', clickKey)
    function clickKey(event){
      if(event.key >= '0' && event.key <= '3'){
        document.removeEventListener('keydown', clickKey)
        Toast.close()
        resolve(`enemy${event.key-1}`);
        console.log(`enemy${event.key}`)
      }
      
    }
    $("#optionE1").click(function () {
      Toast.close();
      resolve("enemy0");
      document.removeEventListener('keydown', clickKey)
    });

    $("#optionE2").click(function () {
      Toast.close();
      resolve("enemy1");
      document.removeEventListener('keydown', clickKey)
    });

    $("#optionE3").click(function () {
      Toast.close();
      resolve("enemy2");
      document.removeEventListener('keydown', clickKey)
    });
  });
}

function selectFriend() {
  return new Promise(async (resolve) => {
    $("#optionF1").show();
    $("#optionF2").show();
    $("#optionF3").show();
    await hideFriendButtons();
    Toast.fire({
      title: "Choose a target",
      html: `
        <button id="optionF1" class="swal2-confirm swal2-styled">Blob 1</button>
        <button id="optionF2" class="swal2-confirm swal2-styled">Blob 2</button>
        <button id="optionF3" class="swal2-confirm swal2-styled">Blob 3</button>
      `,
      timer: 25000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCancelButton: false,
      position: "bottom-right",
    });
    document.addEventListener('keydown', clickKey)
    function clickKey(event){
      if(event.key >= '0' && event.key <= '3'){
        document.removeEventListener('keydown', clickKey)
        Toast.close()
        resolve(`blob${event.key-1}`);
      }
    }
    $("#optionF1").click(function () {
      Toast.close();
      resolve("blob0");
    });
    $("#optionF2").click(function () {
      Toast.close();
      resolve("blob1");
    });
    $("#optionF3").click(function () {
      Toast.close();
      resolve("blob2");
    });
  });
}

setInterval(async function () {
  if (!curwave == 0) {
    await hideButtons()
    await hideFriendButtons()
  }

    
}, 100);

//hide the buttons if the enemy is dead
async function hideButtons() {
  if (enemy0.health <= 0) {
    $("#optionE1").hide();
  }
  if (enemy1.health <= 0) {
    $("#optionE2").hide();
  }
  if (enemy2.health <= 0) {
    $("optionE3").hide();
  }
}

async function hideFriendButtons() {
  if (blob0.health <= 0) {
    $("#optionF1").hide();
  }
  if (blob1.health <= 0) {
    $("#optionF2").hide();
  }
  if (blob2.health <= 0) {
    $("optionF3").hide();
  }
}

//Creates basic blobs

function createBlob(i) {
  if (playerBlobTeam[i] == "basicBlob") {
    playerBlobTeam[i] = basic_Blob;
  } else if (playerBlobTeam[i] == "squishyBlob") {
    playerBlobTeam[i] = squishy_Blob;
  } else if (playerBlobTeam[i] == "slimeBlob") {
    playerBlobTeam[i] = slime_Blob;
  }

  for (i = 0; i < playerBlobTeam.length; i++) {
    if (i == 0) {
      blob0 = playerBlobTeam[i];
    } else if (i == 1) {
      blob1 = playerBlobTeam[i];
    } else {
      blob2 = playerBlobTeam[i];
    }
  }
}

//Draws the player's blob team
function drawPlayerTeam() {
  for (i = 0; i < playerBlobTeam.length; i++) {
    if (i == 0) {
      blob0 = playerBlobTeam[i];
    } else if (i == 1) {
      blob1 = playerBlobTeam[i];
    } else {
      blob2 = playerBlobTeam[i];
    }
    let blob =
      '<img src="images/blobs/' +
      playerBlobTeam[i] +
      '.png" ' +
      ` id="Imageblobs${i}" class="ImageBlobs"` +
      i +
      '"height = "auto" width = "150vw"/>' +
      '<div class="progressbar"><div class="blobprogressbarfill" id="blob' + i + 'health"></div> <span class="blobprogressbartext" id = "blob' + i + 'barText">0</span></div>';

    $(`#blob` + i).html(blob);
    createBlob(i);
  }
  console.log("drew team")
}

//Delete enemy when health is 0
function deleteEnemy() {
  if (enemy0.health <= 0) {
    enemy0 = new enemy("null", 0, 0, 0, 0, 0);
    enemy0health = "Dead";
  }
  if (enemy1.health <= 0) {
    enemy1 = new enemy("null", 0, 0, 0, 0, 0);
    enemy1health = "Dead";
  }
  if (enemy2.health <= 0) {
    enemy2 = new enemy("null", 0, 0, 0, 0, 0);
    enemy2health = "Dead";
  }
}

//Delete blob when health is 0
function deleteBlob() {
  if (blob0.health <= 0) {
    blob0 = new deadBlob();
  }
  if (blob1.health <= 0) {
    blob1 = new deadBlob();
  }
  if (blob2.health <= 0) {
    blob2 = new deadBlob();
  }
}

//Checks if the player has won
function checkWin() {
  if (enemy0.health == 0 && enemy1.health == 0 && enemy2.health == 0) {
    return true;
  } else {
    return false;
  }
}

//Checks if the player has lost
function checkLoss() {
  if (blob0.name == "dead" && blob1.name == "dead" && blob2.name == "dead") {
    return true;
  } else {
    return false;
  }
}

//Starts a new wave
function newWave() {
  if (checkWin() == true && checkLoss() == false) {
    createWave();
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
      createEncounter(true, false);
    } else {
      $("#PlayScreen").show();
      $("#battle").hide();
    }
  });
}

//Use player level to determine enemy level

function determineEnemyLevel(playerLevel) {
  return (enemyLevel = Math.ceil(playerLevel / 10) + Math.floor(Math.random() * 2));
}

function setEnemyImages() {
  for (let i = 0; i < enemySet.length; i++) {
    let enemy = enemySet[i];
    let enemyHTML = '<img src="images/enemies/' + enemy.name + '.png" ' + ' id="enemy' + i + "img" + '" height = "100vh">';
    $(`#enemy` + i + "img").html(enemyHTML);
  }
}

// Use enemy level to determine enemy
function determineEnemy(enemyLevel) {
  if (enemyLevel == 1) {
      return "enslaved";
  } else if (enemyLevel == 2) {
      return "warped";
  } else if (enemyLevel == 3) {
      return "corrupted";
  } else if (enemyLevel == 4) {
      return "possessed";
  } else if (enemyLevel == 5) {
      return "tainted";
  }
}

//Creates a wave
function createWave() {
  //clears enemy set
  clearEnemySet();
  //determines enemy level
  let enemyLevel = determineEnemyLevel(playerLevel);
  //updates enemy set
  for (let i = 0; i < 3; i++) {
    let enemyType = determineEnemy(enemyLevel);
    updateEnemySet(enemyType, 1);
  }
  //sets enemy images
  setEnemyImages();
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

//Creates a boss
function createBoss() {
  //clears enemy set
  clearEnemySet();
  //determines enemy level
  let enemyLevel = determineEnemyLevel(playerLevel);
  //updates enemy set
  for (let i = 0; i < 3; i++) {
    let enemyType = determineEnemy(enemyLevel);
    updateEnemySet(enemyType, 1);
  }
  //sets enemy images
  setEnemyImages();
  //increases overall difficulty
  overAllDifficulty += 1;
  //increases current wave
  curwave += 1;
  //updates the enemy health
  enemy0 = enemySet[0];
  enemy1 = enemySet[1];
  enemy2 = enemySet[2];
  //updates the wave number
  curwave = "Boss";
  $("#waveNum").html("Wave: " + curwave);
}

//Reset battle
function resetBattle() {
  $("#battle").hide();
  
  won = false;
  curwave = 0;
  playerBlobTeam = playerBlobTeamTemp;
  playerHand = playerHandTemp;
  clearInterval(blob0Att);
  clearInterval(blob1Att);
  clearInterval(blob2Att);
  for (i = 0; i < playerBlobTeam.length; i++) {
    if (i == 0) {
      blob0 = playerBlobTeam[i];
    } else if (i == 1) {
      blob1 = playerBlobTeam[i];
    } else {
      blob2 = playerBlobTeam[i];
    }
  }
  $("#waveNum").html("Wave: " + curwave);
  clearInterval(enemy0Att);
  clearInterval(enemy1Att);
  clearInterval(enemy2Att);
  clearInterval(manaIncreaseInterval);
  curMana = 0;
  playerMaxHandSize = 3;
  clearInterval(drawInt);
  //reload
  window.location.reload();
}

async function drawEveryone(isnormalwave,isbosswave){
  drawPlayerTeam();
  drawHand();
  if (isnormalwave) {
    createWave();
  }
  if (isbosswave) {
    createBoss();
  }
}

//Creates an encounter
async function createEncounter(normal, boss) {



  console.log("Encounter created");
  await drawEveryone(normal,boss)

  

  //Health
  setInterval(function () {
    /*
    $("#enemy0health").html('<div class="progressbar"><div class="enemyprogressbarfill" id="enemy0health"></div> <span class="enemyprogressbartext" id = "enemy0barText">0</span></div>');
    $("#enemy1health").html("Health: " + enemySet[1].health);
    $("#enemy2health").html("Health: " + enemySet[2].health);
    */
  }, 100);

  setInterval(function () {
    if(blob0.health > 0){
      updateProgressBar("fraction","blob0health","blob0barText", blob0.health, blob0.statHealth, false, "");
    }else{
      updateProgressBar("fraction","blob0health","blob0barText", blob0.health, blob0.statHealth, true, "dead :(");
    }

    if(blob1.health > 0){
      updateProgressBar("fraction","blob1health","blob1barText", blob1.health, blob1.statHealth, false, "");
    }else{
      updateProgressBar("fraction","blob1health","blob1barText", blob1.health, blob1.statHealth, true, "dead :(");
    }

    if(blob2.health > 0){
      updateProgressBar("fraction","blob2health","blob2barText", blob2.health, blob2.statHealth, false, "");
    }else{
      updateProgressBar("fraction","blob2health","blob2barText", blob2.health, blob2.statHealth, true, "dead :(");
    }

    if(enemy0.health > 0){
      updateProgressBar("fraction","enemy0health","enemy0barText", enemySet[0].health, enemySet[0].statHealth, false, "");
    }else{
      updateProgressBar("fraction","enemy0health","enemy0barText", enemySet[0].health, enemySet[0].statHealth, true, "dead :(");
    }

    if(enemy1.health > 0){
      updateProgressBar("fraction","enemy1health","enemy1barText", enemySet[1].health, enemySet[1].statHealth, false, "");
    }else{
      updateProgressBar("fraction","enemy1health","enemy1barText", enemySet[1].health, enemySet[1].statHealth, true, "dead :(");
    }

    if(enemy2.health > 0){
      updateProgressBar("fraction","enemy2health","enemy2barText", enemySet[2].health, enemySet[2].statHealth, false, "");
    }else{
      updateProgressBar("fraction","enemy2health","enemy2barText", enemySet[2].health, enemySet[2].statHealth, true, "dead :(");
    }
    
    
  
    //$("#blob0health").html("Health: " + blob0.health);
    //$("#blob1health").html("Health: " + blob1.health);
    //$("#blob2health").html("Health: " + blob2.health);
  }, 100);


  setInterval(function () {
    deleteBlob();
    deleteEnemy();
    if (checkWin() == true) {
      newWave();
    }
    if (checkLoss() == true && won == false) {
      won = true;
      
      Swal.fire({
        title: "You lost!",
        text: "You lost the battle!",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "Back to main menu",
      }).then((result) => {
        if (result.value) {
          won = true;
          resetBattle();
          console.log("You lost the battle!");
        }
      });
    }

    for(let i =0; i < playerBlobTeam.length; i++){
      if(playerBlobTeam[i].health > playerBlobTeam[i].statHealth){
        playerBlobTeam[i].health = playerBlobTeam[i].statHealth;
      }
    }

    if (curwave == 4 && won == false) {
      let gottemgold = playerLevel * overAllDifficulty * 2;
      let gottemexp = Math.ceil(playerLevel / 10) * overAllDifficulty;
      won = true;
      Swal.fire({
        title: "You won!",
        text: `You won the battle! You recieved ${gottemgold} and ${gottemexp} exp.`,
        icon: "success",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "Back to main menu",
      }).then((result) => {
        if (result.value) {
          //rewards applied
          gold += gottemgold;
          playerExp += gottemexp;
          curBattlesWon++
          resetBattle();
        }
      });
    }
  }, 100);
  //Blob Attack
  blob0Att = setInterval(function () {

    var attackedEnemy = enemySet[Math.floor(Math.random() * 3)];
    //rerolls the random enemy attack if that enemy is dead.
    while(!(attackedEnemy.health > 0)&& (enemy0.health > 0 &&enemy1.health > 0 &&enemy2.health > 0 )){
      attackedEnemy = enemySet[Math.floor(Math.random() * 3)];
    }
    if (blob0.health > 0 && attackedEnemy.health > 0) {
      blob0.attack(attackedEnemy);
      $("#Imageblobs0").attr("src", "images/blobs/"+blob0.name+"Attack.png")
    }

  }, blob0.basicAtkSpd);

  blob1Att = setInterval(function () {
    var attackedEnemy = enemySet[Math.floor(Math.random() * 3)];
    while(!(attackedEnemy.health > 0) && (enemy0.health > 0 &&enemy1.health > 0 &&enemy2.health > 0 )){
      attackedEnemy = enemySet[Math.floor(Math.random() * 3)];
    }
    if (blob1.health > 0 && attackedEnemy.health > 0) {
      blob1.attack(attackedEnemy);
      $("#Imageblobs1").attr("src", "images/blobs/"+blob1.name+"Attack.png")
    }
  }, blob1.basicAtkSpd);

  blob2Att = setInterval(function () {
    var attackedEnemy = enemySet[Math.floor(Math.random() * 3)];
    while(!(attackedEnemy.health > 0)&& (enemy0.health > 0 &&enemy1.health > 0 &&enemy2.health > 0 )){
      attackedEnemy = enemySet[Math.floor(Math.random() * 3)];
    }
    if (blob2.health > 0 && attackedEnemy.health > 0) {
      blob2.attack(attackedEnemy);
      $("#Imageblobs2").attr("src", "images/blobs/"+blob2.name+"Attack.png")
    }
  }, blob2.basicAtkSpd);

  //Enemy Attack
  enemy0Att = setInterval(function () {
    var attackedBlob = playerBlobTeam[Math.floor(Math.random() * 3)];
    while(!(attackedBlob.health > 0)&& (blob0.health > 0 &&blob1.health > 0 &&blob2.health > 0 )){
      attackedBlob = enemySet[Math.floor(Math.random() * 3)];
    }
    if (enemy0.health > 0 && attackedBlob.health > 0) {
      enemy0.attack(attackedBlob);
    }
  }, enemy0.basicAtkSpd);

  enemy1Att = setInterval(function () {
    var attackedBlob = playerBlobTeam[Math.floor(Math.random() * 3)];
    while(!(attackedBlob.health > 0)&& (blob0.health > 0 &&blob1.health > 0 &&blob2.health > 0 )){
      attackedBlob = enemySet[Math.floor(Math.random() * 3)];
    }
    if (enemy1.health > 0 && attackedBlob.health > 0) {
      enemy1.attack(attackedBlob);
    }
  }, enemy1.basicAtkSpd);

  enemy2Att = setInterval(function () {
    var attackedBlob = playerBlobTeam[Math.floor(Math.random() * 3)];
    while(!(attackedBlob.health > 0)&& (blob0.health > 0 &&blob1.health > 0 &&blob2.health > 0 )){
      attackedBlob = enemySet[Math.floor(Math.random() * 3)];
    }
    if (enemy2.health > 0 && attackedBlob.health > 0) {
      enemy2.attack(attackedBlob);
    }
  }, enemy2.basicAtkSpd);

  //Mana
  manaIncreaseInterval = setInterval(function () {
    $("#curManaDisplay").html("Mana: " + curMana);
    if (curMana < maxManaCap) {
      curMana += manaIncrement;
    }
    $("#Imageblobs0").attr("src", "images/blobs/"+blob0.name+".png")
    $("#Imageblobs1").attr("src", "images/blobs/"+blob1.name+".png")
    $("#Imageblobs2").attr("src", "images/blobs/"+blob2.name+".png")
  }, manaIncreaseTime);
}




//different battles

function startPatrolBattle(){
  Swal.fire({
    title: "???",
    text: "Choose a Patrol Zone",
    showDenyButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Rolling Forests",
    denyButtonText: `The Chasm`,
    cancelButtonText: "Abort",
  }).then((result) => {
    if (result.isConfirmed) {
      $("#PlayScreen").hide();
      $("#battleOptions").hide();
      $("#battle").show();
      //wait function in future maybe cuz studies
      //show that a loading screen makes people think smthng is happening
      createEncounter(true, false);
    } else if(result.isDenied){
      $("#PlayScreen").hide();
      $("#battleOptions").hide();
      $("#battle").show();
      //wait function in future maybe cuz studies
      //show that a loading screen makes people think smthng is happening
      createEncounter(true, false);
    }else{
      $("#PlayScreen").show();
      $("#battle").hide();
      $("#battleOptions").hide();
    }
  });
}