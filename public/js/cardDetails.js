class card {
  constructor(name, varName, dmg, manaCost, attribute1, cardLevel, ability,targets,descrip) {
    this.name = name;
    this.dmg = dmg;
    this.manaCost = manaCost;
    this.attribute1 = attribute1;
    this.cardLevel = cardLevel;
    this.ability = ability;
    this.varName = varName;
    this.targets = targets;
    this.descrip = descrip
    

    this.useCard = async function () {
      console.log("useCard");
      console.log(this.name);
      console.log(playerHand);
      console.log(playerHand.length);
      if (curMana >= manaCost && playerHand.length > 0) {
        let index = playerHand.indexOf(name);
        Toast.fire({
          title: "Choose a target",
        });
        let userInput = "";
        selectState = true;
       
        

        curMana -= manaCost;

        playerHand.splice(index,1)
        drawHand();
        if(this.targets == "enemyone"){
          userInput = await selectEnemy();
        }else if(this.targets == "enemyall"){
          userInput = "enemyall"
        }else if(this.targets == "friendone"){
          userInput = await selectFriend();
        }else if(this.targets == "friendall"){
          userInput = "friendall"
        }
        if(this.targets.includes("enemy")){
          if (userInput == "enemy0" && enemy0.health > 0) {
            getCardAbility(this, enemy0)
          } else if (userInput == "enemy1" && enemy1.health > 0) {
            getCardAbility(this, enemy1)
          } else if (userInput == "enemy2" && enemy2.health > 0) {
            getCardAbility(this, enemy2)
          }else if(userInput == "enemyall"){
            getCardAbility(this, enemy0)
            getCardAbility(this, enemy1)
            getCardAbility(this, enemy2)
          }else{
            Toast.fire({
              title: "The enemy you chose is dead, choose another!",
            });
            curMana += manaCost;
            drawHand();
            //wait for drawDelay
            //setTimeout(function () {
              //dealCard();
            //}, playerDrawDelay);
          }
        }
        
        if(this.targets.includes("friend")){
        if(userInput == "blob0" && blob0.health > 0) {
          getCardAbility(this, blob0)
        } else if (userInput == "blob1" && blob1.health > 0) {
          getCardAbility(this, blob1)
        } else if (userInput == "blob2" && blob2.health > 0) {
          getCardAbility(this, blob2)
        }else if(userInput == "friendall"){
          getCardAbility(this, blob0)
          getCardAbility(this, blob1)
          getCardAbility(this, blob2)
        }else{
          Toast.fire({
            title: "The blob you chose is dead, choose another!",
          });
          curMana += manaCost;
          drawHand();
          //wait for drawDelay
          //setTimeout(function () {
            //dealCard();
          //}, playerDrawDelay);
        }
      }
      } else if (curMana < manaCost) {
        Toast.fire({
          title: "You don't have enough mana to perform this!",
        });
      } else {
        Toast.fire({
          title: "You don't have any cards in your hand!",
        });
      }
    };
  }
}


function getCardAbility(card, target){
  if(card.name == "ember"){
    dealDamage(target, card.dmg)
  }else if(card.name == "heal"){
    healBlob(target, card.dmg)
  }
}

class burnEffect {
  constructor(dmg, duration) {
    this.dmg = dmg;
    this.duration = duration;
    this.description = "Burns the enemy, scorching for " + dmg + " over " + duration + "ms.";
  }
}


function healBlob(friend, amount){
  friend.health += amount;
}

function dealDamage(enemy, amount){
    enemy.health -= amount
}