//Player stats

//Player draws a card every 4 seconds
var playerDrawDelay = 4000;

//Max of 3 cards in hand
var playerMaxHandSize = 3;

//Player starts with 1 blob
var playerBlobTeam = ["basicBlob"]
var playerTeamMax = 3;


var playerDeck = ["ember"];
//represents the players deck, (they start with only card, ember)

//There is a doc with the card's effect and list

var playerHand = [];
//represents the cards in the player's hand

function drawCard(){

}

//Creates enemies, of a certain type and number
function createEnemySet(type, number){
    if(type == 0 && number == 0){
        return 0;
        //no enemies are created
    }


}


function drawPlayerTeam(){
    for(i = 0; i < playerBlobTeam.length; i++){
        console.log(i)
        let blob = '<img src="images/' + playerBlobTeam[i] + '.png" ' + ' id="blob' + i + '">';
        $(`#blob` + i).html(blob)
        console.log(blob)
        console.log($(`#blob` + i).html())
    }
}

function setupEnemyWave(enemy1, enemy2, enemy3){
    let enemy1Img = '<img src="images/' + enemy1 + '.png" ' + ' id="enemy1">';
    let enemy2Img = '<img src="images/' + enemy2 + '.png" ' + ' id="enemy2">';
    let enemy3Img = '<img src="images/' + enemy3 + '.png" ' + ' id="enemy3">';
    $("#enemy1").html(enemy1Img);
    $("#enemy2").html(enemy2Img);
    $("#enemy3").html(enemy3Img);
    
}

function startBattle(){
    Swal.fire({
        title: '???',
        text: 'Opening a battle rift... Continue?',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Proceed',
        cancelButtonText:'Abort'
        }).then((result) => {
            if(result.value){
                $("#PlayScreen").hide();
                $("#battle").show();
                //wait function in future maybe cuz studies 
                //show that a loading screen makes people think smthng is happening
                createEncounter()
            }
            else{
                $("#PlayScreen").show();
                $("#battle").hide();
            }
        }
        )
}

function createEncounter(){
    drawPlayerTeam();
    
}
