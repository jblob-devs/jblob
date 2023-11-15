//Player stats
  
var curwave = 0;

let leEmbCard = new card("ember",3,2,"fire",1);

//Player starts with 1 blob
var playerBlobTeam = ["basicBlob"];
var playerTeamMax = 3;

var overAllDifficulty = 1

//blobs
var blob0;
var blob1;
var blob2;

//enemies
var enemy0;
var enemy1;
var enemy2;

var enemy3;
var enemy4;
var enemy5;

var enemy6;
var enemy7;
var enemy8;

function drawCard() {}

//Creates enemies, of a certain type and number

//type is the type of enemy to create
//type is 0-4
//type 0 is starter enemy
//type 1 is intermediate enemy
//type 2 is advanced enemy
//type 3 is gilded enemy
//type 4 is boss enemy

function createEnemySet(type, number) {
  var enemySet = [];
  for (i = 0; i < number; i++) {
    enemySet.push(createEnemy(type));
    if (i == 0) {
      enemy0 = enemySet[i];
    } else if (i == 1) {
      enemy1 = enemySet[i];
    } else {
      enemy2 = enemySet[i];
    }
  }

  return enemySet;
}

async function selectEnemy(){
    let userInput = await Toast.fire({
        title: 'Choose a target',
        input: 'select',
        inputOptions: {
            'enemy0': 'Enemy 1',
            'enemy1': 'Enemy 2',
            'enemy2': 'Enemy 3'
        },
        inputPlaceholder: 'Select an enemy',
        showCancelButton: false,
        showConfirmButton: true,
        showTimerProgressBar: false,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value === 'enemy0' || value === 'enemy1' || value === 'enemy2') {
                    resolve()
                } else {
                    resolve('You need to select an enemy')
                }
            })
        }
    })
    return userInput.value;
}




function createEnemy(type) {
  var enemy = {};
  switch (type) {
    case 0:
      enemy = createStarterEnemy();
      break;
    case 1:
      enemy = createIntermediateEnemy();
      break;
    case 2:
      enemy = createAdvancedEnemy();
      break;
    case 3:
      enemy = createGildedEnemy();
      break;
    case 4:
      enemy = createBossEnemy();
      break;
    default:
      enemy = createStarterEnemy();
      break;
  }
  return enemy;
}

function createStarterEnemy() {
  //Chooses a random enemy type from the starter enemy types (2)
  var enemyType = Math.floor(Math.random() * 2);

  //Creates the enemy
  if (enemyType == 0) {
    var enemy = new enslaved();
  } else {
    var enemy = new dim();
  }
  return enemy;
}

function createIntermediateEnemy() {
  //Chooses a random enemy type from the intermediate enemy types (2)
  var enemyType = Math.floor(Math.random() * 2);

  //Creates the enemy
  if (enemyType == 0) {
    var enemy = new warped();
  } else {
    var enemy = new gloom();
  }
  return enemy;
}

function createAdvancedEnemy() {
  //Chooses a random enemy type from the advanced enemy types (2)
  var enemyType = Math.floor(Math.random() * 2);

  //Creates the enemy
  if (enemyType == 0) {
    var enemy = new corrupted();
  } else {
    var enemy = new bright();
  }
  return enemy;
}

function createGildedEnemy() {
  //Chooses a random enemy type from the gilded enemy types (2)
  var enemyType = Math.floor(Math.random() * 2);

  //Creates the enemy
  if (enemyType == 0) {
    var enemy = new possessed();
  } else {
    var enemy = new radiant();
  }
  return enemy;
}

function createBossEnemy() {
  //Chooses a random enemy type from the boss enemy types (2)
  var enemyType = Math.floor(Math.random() * 2);

  //Creates the enemy
  if (enemyType == 0) {
    var enemy = new tainted();
  } else {
    var enemy = new luminescent();
  }
  return enemy;
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

function setupEnemyWave() {
  let set = createEnemySet(overAllDifficulty, 3);

  for (i = 0; i < set.length; i++) {
    let enemy = '<img src="images/' + set[i] + '.png" ' + ' id="enemy' + i + '">';
    $(`#enemy` + i).html(enemy);
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
  createEnemySet(overAllDifficulty, 3);


  setInterval(function () {
    $("#enemy0health").html("Health: " + enemy0.health);
    $("#enemy1health").html("Health: " + enemy1.health);
    $("#enemy2health").html("Health: " + enemy2.health);
  }, 100);
  
  //blob0 attack
  setInterval(function () {
    rand = Math.floor(Math.random() * 3);
    if (curwave == 0) {
      if (rand == 0) {
        if (blob0.health > 0 && enemy0.health > 0) {
          enemy0.health -= blob0.basicAtkDmg;
        }
      } else if (rand == 1) {
        if (blob0.health > 0 && enemy1.health > 0) {
          enemy1.health -= blob0.basicAtkDmg;
        }
      } else {
        if (blob0.health > 0 && enemy2.health > 0) {
          enemy2.health -= blob0.basicAtkDmg;
        }
      }
    } else if (curwave == 1) {
      if (rand == 0) {
        if (blob0.health > 0 && enemy3.health > 0) {
          enemy3.health -= blob0.basicAtkDmg;
        }
      } else if (rand == 1) {
        if (blob0.health > 0 && enemy4.health > 0) {
          enemy4.health -= blob0.basicAtkDmg;
        }
      } else {
        if (blob0.health > 0 && enemy5.health > 0) {
          enemy5.health -= blob0.basicAtkDmg;
        }
      }
    }
  }, blob0.basicAtkSpd);
  //blob1 attack
  if(playerDeck.length == 2){
    setInterval(function () {
      rand = Math.floor(Math.random() * 3);
      if (curwave == 0) {
        if (rand == 0) {
          if (blob1.health > 0 && enemy0.health > 0) {
            enemy0.health -= blob1.basicAtkDmg;
          }
        } else if (rand == 1) {
          if (blob1.health > 0 && enemy1.health > 0) {
            enemy1.health -= blob1.basicAtkDmg;
          }
        } else {
          if (blob1.health > 0 && enemy2.health > 0) {
            enemy2.health -= blob1.basicAtkDmg;
          }
        }
      } else if (curwave == 1) {
        if (rand == 0) {
          if (blob1.health > 0 && enemy3.health > 0) {
            enemy3.health -= blob1.basicAtkDmg;
          }
        } else if (rand == 1) {
          if (blob1.health > 0 && enemy4.health > 0) {
            enemy4.health -= blob1.basicAtkDmg;
          }
        } else {
          if (blob1.health > 0 && enemy5.health > 0) {
            enemy5.health -= blob1.basicAtkDmg;
          }
        }
      }
    }, blob1.basicAtkSpd);
  }
  
  //blob2 attack
  if(playerDeck.length == 3){
    setInterval(function () {
      rand = Math.floor(Math.random() * 3);
      if (curwave == 0) {
        if (rand == 0) {
          if (blob2.health > 0 && enemy0.health > 0) {
            enemy0.health -= blob2.basicAtkDmg;
          }
        } else if (rand == 1) {
          if (blob2.health > 0 && enemy1.health > 0) {
            enemy1.health -= blob2.basicAtkDmg;
          }
        } else {
          if (blob2.health > 0 && enemy2.health > 0) {
            enemy2.health -= blob2.basicAtkDmg;
          }
        }
      } else if (curwave == 1) {
        if (rand == 0) {
          if (blob2.health > 0 && enemy3.health > 0) {
            enemy3.health -= blob2.basicAtkDmg;
          }
        } else if (rand == 1) {
          if (blob2.health > 0 && enemy4.health > 0) {
            enemy4.health -= blob2.basicAtkDmg;
          }
        } else {
          if (blob2.health > 0 && enemy5.health > 0) {
            enemy5.health -= blob2.basicAtkDmg;
          }
        }
      }
    }, blob2.basicAtkSpd);
  }
  
//Coding battle mechanics
}

