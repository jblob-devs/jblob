class basicBlob {
  constructor() {
    this.name = "basicBlob";
    this.health = 300;
    this.basicAtkDmg = 30;
    //atk spd written in ms
    this.basicAtkSpd = 2875;

    this.level = 1;
    this.img = "basicBlob.png";

    this.attack = function (target) {
      target.health -= this.basicAtkDmg;
    }
  }
}

class squishyBlob {
  constructor() {
    this.name = "squishyBlob";
    this.health = 200;
    this.basicAtkDmg = 40;
    //atk spd written in ms
    this.basicAtkSpd = 2450;

    this.level = 1;
    this.img = "squishyBlob.png";

    this.attack = function (target) {
      target.health -= this.basicAtkDmg;
    }
  }
}

class slimeBlob {
  constructor() {
    this.name = "slimeBlob";
    this.health = 350;
    this.basicAtkDmg = 30;
    //atk spd written in ms
    this.basicAtkSpd = 2400;
    this.level = 1;
    this.img = "slimeBlob.png";

    this.attack = function (target) {
      target.health -= this.basicAtkDmg;
    }
  }
}

class deadBlob {
  constructor() {
    this.name = "dead"
    this.health = 0;
    this.basicAtkDmg = 0;
    //atk spd written in ms
    this.basicAtkSpd = 0;
    this.specialAtkDmg = 0;
    this.specialAtkSpd = 0;
    this.level = 1;
  }
}

class enemy {
  constructor(name, health, basicAtkDmg, basicAtkSpd, specialAtkDmg, specialAtkSpd) {
    this.health = health;
    this.basicAtkDmg = basicAtkDmg;
    this.basicAtkSpd = basicAtkSpd;
    this.specialAtkDmg = specialAtkDmg;
    this.name = name;

    this.attack = function (target) {
      let randy = Math.floor(Math.random()*5)
      if(randy == 1){
        target.health -= this.specialAtkDmg;
      }else{
      target.health -= this.basicAtkDmg;
      }

    }
  }
}
