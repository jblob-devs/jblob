
/*
Daily pack, 3 slots
slot 1: 10-20 exp
slot 2: 20-30 gold
slot 3: low chance for common card, else 2-5 resonance

*/
function buyDailyPack(){
    if(canClaimDaily){
        openDailyPack()
        canClaimDaily = false;
        dailyCount = 5000
    }else{
        Swal.fire({
            text: "You have already claimed your Daily Pack for today!"
        })
    }
}

function openDailyPack(){
    $("#dailyPackOpen").show()
    $("#packs").slideDown()
    $("#shop").slideUp()
}

function openDailyPack2(){
    if(packSlot == 1){
        let randy = Math.floor(Math.random() * 10)+10;
        $("#dailyPackPic").attr("src","ember.png")
        $("#pullsInfoP").html("Exp +" + randy)
        exp+=randy
        packSlot++
    }
    
    else if(packSlot == 2){
        randy = Math.floor(Math.random() * 20)+10;
    $("#dailyPackPic").attr("src","ember.png")
    $("#pullsInfoP").html("Gold +" + randy)
    gold+=randy
    packSlot++
    }
    
    else if(packSlot == 3){
        randy = Math.floor(Math.random() * 3)+2;
    $("#dailyPackPic").attr("src","ember.png")
    $("#pullsInfoP").html("Resonance +" + randy)
    gold+=randy
    packSlot++
    }
    
    else{
        $("#dailyPackOpen").hide()
    $("#packs").slideUp()
    $("#shop").slideDown()
    packSlot = 1
    }
    

}