class card {
  constructor(name, dmg, manaCost, attribute1, cardLevel, ability) {
    this.name = name;
    this.dmg = dmg;
    this.manaCost = manaCost;
    this.attribute1 = attribute1;
    this.cardLevel = cardLevel;
    this.ability = ability;

    this.useCard = async function () {
      let index = playerHand.indexOf(name);
      playerHand.splice(index, 1);
      Toast.fire({
        title: "Choose a target",
      });
      selectState = true;
      let userInput = await selectEnemy();

      console.log(userInput);

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
