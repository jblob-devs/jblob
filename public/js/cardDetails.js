class emberCard {
    constructor(){
        this.dmg = 3;
        this.manaCost = 2;
        this.attribute1 = "fire";
        this.cardLevel = 1;
        
    this.useCard = async function(){
        let index = playerHand.indexOf("ember")
        playerHand.splice(index,1)
        Toast.fire({
            title: 'Choose a target'
        })
        selectState = true;
        userInput = await selectEnemy();

        if(userInput == "enemy0"){
            enemy0.health -= emberCard.dmg;
        }else if (userInput == "enemy1"){
            enemy1.health -= emberCard.dmg;
        }else if(userInput == "enemy2"){
            enemy2.health -= emberCard.dmg;
        }
    }

    }

}