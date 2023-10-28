//slides the title screen down
$("StartScreen").show();
//Make all the screens/divs slide up at the start of the game
$("#MyBlobs").hide();
$("#ExtraStuff").hide();
$("#GetBlobs").hide();
$("#settings").hide();
$("#slimepedia").hide();
$("#ExtraCode").hide();
$("#DevHacks").hide();
$("#Blobs").hide();
$("#Shop").hide();
$("#Blobs").hide();
$("#PlayScreen").hide();
$("#inventory").hide();
//Hide dev hacks
$("#DevHacks").hide();

function play(){
    $("#StartScreen").hide();
    $("#PlayScreen").show();
};