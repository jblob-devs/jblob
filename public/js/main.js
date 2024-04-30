const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


//slides the title screen down
$("StartScreen").hide();
play();
//Make all the screens/divs slide up at the start of the game :O
$("#MyBlobs").hide();
$("#ExtraStuff").hide();
$("#ExtraStuff2").hide();
$("#GetBlobs").hide();
$("#settings").hide();
$("#slimepedia").hide();
$("#ExtraCode").hide();
$("#ExtraCode2").hide();
$("#DevHacks").hide();
$("#Blobs").hide();
$("#shop").hide();
$("#Blobs").hide();
$("#PlayScreen").show();
$("#inventory").hide();
//Hide dev hacks
$("#DevHacks").hide();
$("#Credits").hide();
$("#battle").hide();
$("#dailyButton").hide();
$("#battleOptions").hide();
$("#battlescreen").hide();
$("#blobpedia").hide();
$("#inventory").hide();

//ping the server post request to see if daily pack is available
$.post("/checkdaily", function(data){
    if(data == "T"){
        $("#dailyAvailible").html("Daily Pack Available")
        $("#dailyButton").show()
    } else if (data == "F"){
        $("#dailyAvailible").html("Daily Pack unavailable. Check back tomorrow!")
    }
});

function checkdaily(){
    $.post("/checkdaily", function(data){
        if(data == "T"){
            $("#dailyAvailible").html("Daily Pack Available")
            $("#dailyButton").show()
        } else if (data == "F"){
            $("#dailyAvailible").html("Daily Pack unavailable. Check back tomorrow!")
        }
    });
}

function play(){
    $("#Credits").hide();
    $("#StartScreen").hide();
    $("#PlayScreen").show();
};

function settings(){
    $("#PlayScreen").hide();
    $("#settings").show();
}

function slimepedia(){
    $("#PlayScreen").hide();
    $("#slimepedia").show();
}

function extra(){
    $("#StartScreen").hide();
    $("#ExtraStuff").show();
}

function extra2(){
    $("#ExtraCode").show();
}

function extra3(){
    $("#PlayScreen").hide();
    $("#ExtraStuff2").show();
}

function extra4(){
    $("#ExtraCode2").show();
}

function devhacks(){
    $("#StartScreen").hide();
    $("#DevHacks").show();
}

function toShop(){
    $("#PlayScreen").hide();
    checkdaily();
    $("#shop").show();
}

function inventory(){
    $("#PlayScreen").hide();
    $("#inventory").show();
}

function back(){
    $("#PlayScreen").show();
    $("#settings").hide();
    $("#slimepedia").hide();
    $("#ExtraCode").hide();
    $("#DevHacks").hide();
    $("#Shop").hide();
    $("#inventory").hide();
    $("#packs").hide();
    $("battlescreen").hide()
    $("#battleOptions").hide();
    $("#blobpedia").hide();
    $("#inventory").hide();
}

function back2(){
    $("#StartScreen").show();
    $("#ExtraStuff").hide();
}

function back3(){
    $("#StartScreen").show();
    $("#DevHacks").hide();
}

function back4(){
    $("#PlayScreen").show();
    $("#Shop").hide();
}

function back5(){
    $("#PlayScreen").show();
    $("#inventory").hide();
}

function back6(){
    $("#ExtraCode").hide();
}

function back7(){
    $("#PlayScreen").show();
    $("#shop").hide();
}

function back8(){
    $("#PlayScreen").show();
    $("#ExtraStuff2").hide();
}

function back9(){
    $("#ExtraCode2").hide();
}

function back10(){
    $("#PlayScreen").show();
    $("#inventory").hide();
}

function backcredits(){
    $("#ExtraStuff2").show();
    $("#Credits").hide();
}

function toCredits(){
    $("#Credits").show();
}

function toBattle(){
    $("#PlayScreen").slideUp();
    $("#battleOptions").slideDown();
    $("#battlescreen").show();
}

function toInventory(){
    $("#PlayScreen").slideUp();
    $("#inventory").slideDown();
}
function toBlobScreen(){
    $("#PlayScreen").slideUp();
    $("#blobpedia").show();
}

setInterval(function(){
    if(selectState){
        $("#enemy0name").click(function(){
            $(this).data('clicked', true);
            selectState = false;
        });
        
        
        $("#enemy1name").click(function(){
            $(this).data('clicked', true);
            selectState = false;
        });
        
        
        $("#enemy1name").click(function(){
            $(this).data('clicked', true);
            selectState = false;
        });
    }
}, 100);

setInterval(function(){
    $("#gold").html(gold);
    $("#level").html(playerLevel);
    $("#exp").html(playerExp);
    $("#resonance").html(resonance)
    $("#blobTeam1").attr("src","images/blobs/"+playersTeam[0]+".png")
    $("#blobTeam2").attr("src","images/blobs/"+playersTeam[1]+".png")
    $("#blobTeam3").attr("src","images/blobs/"+playersTeam[2]+".png")
}, 100);

setInterval(function(){
    saveGameState();
}, 10000);

