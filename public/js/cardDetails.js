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

    this.useCard = async function () {
      let index = playerHand.indexOf(name);
      playerHand.splice(index, 1);
      Toast.fire({
        title: "Choose a target",
      });
      selectState = true;
      let userInput = await selectEnemy();

      if (userInput == "enemy0") {
        enemy0.health -= this.dmg;
      } else if (userInput == "enemy1") {
        enemy1.health -= this.dmg;
      } else if (userInput == "enemy2") {
        enemy2.health -= this.dmg;
      }
    };
  }
}



class burnEffect{
  constructor(dmg, duration){
    this.dmg=dmg;
    this.duration=duration;
    this.description = "Burns the enemy, scorching for "+ dmg + " over " + duration + "ms."
  }
}

//An empy constructor for when a card has no extra abilities
class empty{
  constructor(){
    this.description = "No abilities"
  }
}


class linkCard{
  constructor(linkDescrip, linkCost){
    this.linkDescrip = linkDescrip;
    this.linkCost = linkCost;
  }
}

class emptyLink{
  constructor(){
    this.linkDescrip = "No Link effect";
    this.linkCost = 0;
  }
}