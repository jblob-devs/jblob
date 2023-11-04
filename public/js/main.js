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
$("#Credits").hide();
$("#battle").hide();

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

function devhacks(){
    $("#StartScreen").hide();
    $("#DevHacks").show();
}

function shop(){
    $("#PlayScreen").hide();
    $("#Shop").show();
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

function backcredits(){
    $("#ExtraStuff").show();
    $("#credits").hide();
}

function toCredits(){
    $("#credits").show();
}

function toBattle(){
startBattle()
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

