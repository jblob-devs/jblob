
/*
Daily pack, 3 slots
slot 1: 10-20 exp
slot 2: 20-30 gold
slot 3: low chance for common card, else 2-5 resonance

*/
function buyDailyPack(){
    if(canClaimDaily){
        $("#dailyPackOpen").show()
        $("#shop").hide()
        canClaimDaily = false;
        dailyCount = 5000
    }else{
        Swal.fire({
            text: "You have already claimed your Daily Pack for today!"
        })
    }
}