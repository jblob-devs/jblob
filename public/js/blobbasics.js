class basicBlob {
    constructor(){
        this.health = 30;
        this.basicAtkDmg = 3;
        //atk spd written in ms
        this.basicAtkSpd = 500;
        this.specialAtkDmg = 6;
        this.specialAtkSpd = 4000;
        
        this.level = 1;
    }
}

class squishyBlob {
    constructor(){
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
    constructor(){
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


//enemy constructors

//CULT OF THE CULLED

class enslaved {
    constructor(){
        this.health = 10;
        this.basicAtkDmg = 1;
    }
}

class warped {
    constructor(){
        this.health = 20;
        this.basicAtkDmg = 2;   
    }
}

class corrupted {
    constructor(){
        this.health = 30;
        this.basicAtkDmg = 3;
    }
}

class possessed {
    constructor(){
        this.health = 40;
        this.basicAtkDmg = 4;
    }
}

class tainted {
    constructor(){
        this.health = 50;
        this.basicAtkDmg = 5;
    }
}

//CULT OF THE LIGHT

class dim {
    constructor(){
        this.health = 50;
        this.basicAtkDmg = 5;
    }
}

class gloom {
    constructor(){
        this.health = 60;
        this.basicAtkDmg = 6;
    }
}

class bright {
    constructor(){
        this.health = 70;
        this.basicAtkDmg = 7;
    }
}

class radiant {
    constructor(){
        this.health = 80;
        this.basicAtkDmg = 8;
    }
}

class luminescent {
    constructor(){
        this.health = 90;
        this.basicAtkDmg = 9;
    }
}

