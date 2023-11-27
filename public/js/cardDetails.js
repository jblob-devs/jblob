class card {
  constructor(name, varName, dmg, manaCost, attribute1, cardLevel, ability, linkDescrip) {
    this.name = name;
    this.dmg = dmg;
    this.manaCost = manaCost;
    this.attribute1 = attribute1;
    this.cardLevel = cardLevel;
    this.ability = ability;
    this.linkDescrip = linkDescrip;
    this.varName = varName;
    let descrip = new cardDescrips();
    if (this.name == "ember") {
      this.descrip = descrip.emberDescrip;
    } else if (this.name == "drip") {
      this.descrip = descrip.dripDescrip;
    }

    this.useCard = async function () {
      console.log("useCard");
      console.log(this.name);
      console.log(playerHand);
      console.log(playerHand.length);
      if (curMana > manaCost && playerHand.length > 0) {
        let index = playerHand.indexOf(name);
        Toast.fire({
          title: "Choose a target",
        });
        selectState = true;
        let userInput = await selectEnemy();
        curMana -= manaCost;

        playerHand.splice(index,1)
        drawHand();
        if (userInput == "enemy0" && enemy0.health > 0) {
          enemy0.health -= this.dmg;
        } else if (userInput == "enemy1" && enemy1.health > 0) {
          enemy1.health -= this.dmg;
        } else if (userInput == "enemy2" && enemy2.health > 0) {
          enemy2.health -= this.dmg;
        } else {
          Toast.fire({
            title: "The enemy you chose is dead, choose another!",
          });
          curMana += manaCost;
          drawHand();
          //wait for drawDelay
          setTimeout(function () {
            dealCard();
          }, playerDrawDelay);
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


class burnEffect {
  constructor(dmg, duration) {
    this.dmg = dmg;
    this.duration = duration;
    this.description = "Burns the enemy, scorching for " + dmg + " over " + duration + "ms.";
  }
}

//An empy constructor for when a card has no extra abilities
class empty {
  constructor() {
    this.description = "No abilities";
  }
}

class linkCard {
  constructor(linkDescrip, linkCost) {
    this.linkDescrip = linkDescrip;
    this.linkCost = linkCost;
  }
}

class emptyLink {
  constructor() {
    this.linkDescrip = "No Link effect";
    this.linkCost = 0;
  }
}

class cardDescrips {
  constructor() {
    this.emberDescrip = "Shoots a mildly hot ember. Does 3 damage on hit.";
    this.dripDescrip = "Splash water on your enemy. Does 3 damage on hit.";
  }
}
