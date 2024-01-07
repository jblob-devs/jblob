
/*
Daily pack, 3 slots
slot 1: 10-20 exp
slot 2: 20-30 gold
slot 3: low chance for common card, else 2-5 resonance

*/
function buyDailyPack(){

        openDailyPack()
}

function openDailyPack(){
    $("#dailyPackOpen").show()
}

var recap = "Recap: <br>";
function openDailyPack2(){
    if(packSlot == 1){
        let randy = Math.floor(Math.random() * 10)+10;
        $("#dailyPackPic").attr("src","images/amogus.jpg")
        $("#pullsInfoP").html("Exp +" + randy)
        playerExp+=randy
        recap += "exp +" + randy +"<br>";
        packSlot++
    }
    
    else if(packSlot == 2){
        randy = Math.floor(Math.random() * 20)+10;
    $("#dailyPackPic").attr("src","images/cards/goldCard.png")
    $("#pullsInfoP").html("Gold +" + randy)
    gold+=randy
    recap += "gold + " + randy +"<br>";
    packSlot++
    }
    
    else if(packSlot == 3){
        randy = Math.floor(Math.random() * 3)+2;
    $("#dailyPackPic").attr("src","images/cards/resonanceCard.png")
    $("#pullsInfoP").html("Resonance +" + randy)
    resonance +=randy
    recap += "resonance + " + randy +"<br>";
    packSlot++
    }else if(packSlot == 4){
        $("#dailyPackPic").attr("src","images/cards/dailypack.png")
        $("#pullsInfoP").html(function(){
            return recap;
        });
        packSlot++
    }
    
    else{
    $("#dailyPackOpen").hide()
    $("#dailyPackPic").attr("src","images/cards/dailypack.png")
    $("#pullsInfoP").html("Click to open!")
    recap = "Recap: <br>";
    packSlot = 1
    window.location.href='/'
    }
    

}