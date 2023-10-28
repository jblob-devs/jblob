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
        this.specialAtkDmg = 0;
        this.specialAtkSpd = 8000;
        
        this.specialAtkHeal = function(){
            
        };

        this.level = 1;
    }
}