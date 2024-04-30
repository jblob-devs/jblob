//update shop
setInterval(function () {
    $("#shopItem2Pic").attr("src", 'images/cards/baseSetPack.png')
    $("#shopItem2Pic").click(function(){
        Swal.fire({
            title: "Confirm Purchase",
            text: "Purchase one basic set pack for 100 gold?",
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: "Purchase (100 gold)",
            cancelButtonText: "Cancel"
          }).then((result) => {
            if (result.value) {
              if(gold >= 100){
                gold-=100
                packsOwned.push("basicSetPack")
                Toast.fire({text:"Basic Set Pack purchased!"}) 
              }else{
                Toast.fire({text:"Not enough gold!"}) 
              }
            }
          });
    })
}, 1000);