class basicBlob {
  constructor() {
    this.health = 30;
    this.basicAtkDmg = 3;
    //atk spd written in ms
    this.basicAtkSpd = 500;
    this.specialAtkDmg = 6;
    this.specialAtkSpd = 4000;

    this.level = 1;
    this.img = "";
  }
}

class squishyBlob {
  constructor() {
    this.health = 20;
    this.basicAtkDmg = 4;
    //atk spd written in ms
    this.basicAtkSpd = 450;
    this.specialAtkDmg = 6;
    this.specialAtkSpd = 4000;

    this.level = 1;
  }
}

class slimeBlob {
  constructor() {
    this.health = 35;
    this.basicAtkDmg = 3;
    //atk spd written in ms
    this.basicAtkSpd = 400;
    this.specialAtkDmg = 2;
    this.specialAtkSpd = 8000;
    //special attack applies "slimed" debuff
    this.specialAtkDebuff = "slimed";
    //makes the enemy take 1.5x damage from basic attacks
    this.specialAtkDebuffEffect = 1.5;
    //lasts 3 seconds
    this.specialAtkDebuffDuration = 3000;
    this.level = 1;
  }
}

class enemy {
  constructor(name, health, basicAtkDmg, basicAtkSpd, specialAtkDmg, specialAtkSpd) {
    this.health = health;
    this.basicAtkDmg = basicAtkDmg;
    this.basicAtkSpd = basicAtkSpd;
    this.specialAtkDmg = specialAtkDmg;
    this.specialAtkSpd = specialAtkSpd;
    this.name = name;
  }
}
