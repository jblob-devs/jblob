class basicBlob {
  constructor() {

    //stats
    this.statHealth = 300;
    this.statBasicAtkDmg = 30;
    this.statBasicAtkSpd = 2875;
    this.statLevel = 1;


    this.name = "basicBlob";
    this.flavorText = "A basic blob full of hidden potential. Supposedly good in stew.";

    //battle temp stats
    this.health = this.statHealth;
    this.basicAtkDmg = this.statBasicAtkDmg;
    //atk spd written in ms
    this.basicAtkSpd = this.statBasicAtkSpd;

    this.level = this.statLevel;
    this.img = "basicBlob.png";

    this.attack = function (target) {
      target.health -= this.basicAtkDmg;
    }

    this.upgradeLevel = function(){
      this.statHealth  = Math.round(this.statHealth * 1.2)
    }


    
  }
}

class squishyBlob {
  constructor() {
    this.statHealth = 200;
    this.statBasicAtkDmg = 40;
    //atk spd written in ms
    this.statBasicAtkSpd = 2450;

    this.statLevel = 1;

    this.name = "squishyBlob";
    this.flavorText = "A very flat blob. Seems like it was squished by something heavy...";

    this.health = this.statHealth;
    this.basicAtkDmg = this.statBasicAtkDmg;
    //atk spd written in ms
    this.basicAtkSpd = this.statBasicAtkSpd;

    this.level = this.statLevel;
    this.img = "squishyBlob.png";

    this.attack = function (target) {
      target.health -= this.basicAtkDmg;
    }

    this.upgradeLevel = function(){
      this.statHealth  = Math.round(this.statHealth * 1.2)
    }
  }
}

class slimeBlob {
  constructor() {
    this.statHealth = 350;
    this.statBasicAtkDmg = 30;
    //atk spd written in ms
    this.statBasicAtkSpd = 2400;
    this.statLevel = 1;

    this.name = "slimeBlob";
    this.flavorText = "Very slime-y blob. So slime-y that it leaves a trail of slime wherever it goes.";

    this.health = this.statHealth;
    this.basicAtkDmg = this.statBasicAtkDmg;
    //atk spd written in ms
    this.basicAtkSpd = this.statBasicAtkSpd;
    this.level = this.statLevel;
    this.img = "slimeBlob.png";

    this.attack = function (target) {
      target.health -= this.basicAtkDmg;
    }

    this.upgradeLevel = function(){
      this.statHealth  = Math.round(this.statHealth * 1.2)
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
    this.statHealth = this.health
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
