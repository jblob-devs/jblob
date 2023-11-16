// Creator: Ekaterina
// Starter Enemy: Enslaved, Dim
// Intermediate Enemy: Warped, Gloom
// Advanced Enemy: Corrupted, Bright
// Gilded Enemy: Posessed, Radiant
// Boss Enemy: Tainted, Luminescent

//Player stats

var curwave = 0;

let leEmbCard = new card("ember", 3, 2, "fire", 1);

//Player starts with 1 blob
var playerBlobTeam = ["basicBlob", "basicBlob", "basicBlob"];
var playerTeamMax = 3;

var overAllDifficulty = 1;

//blobs
var blob0;
var blob1;
var blob2;

//enemies
var enemy0;
var enemy1;
var enemy2;
var enemySet = [];
function drawCard() {}

//Creates enemies, of a certain type and number

function updateEnemySet(type, number) {
  for (let i = 0; i < num; i++) {
    if (type == "culled") {
      let culled = new enemy("culled", 15, 2, 1000, 0, 0);
      enemySet.push(culled);
    }
  }
  return enemySet;
}

function clearEnemySet() {
  enemySet = [];
}

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

function createEncounter() {
  drawPlayerTeam();
  updateEnemySet("culled", 3);

  setInterval(function () {
    $("#enemy0health").html("Health: " + enemy0.health);
    $("#enemy1health").html("Health: " + enemy1.health);
    $("#enemy2health").html("Health: " + enemy2.health);
  }, 100);
}
