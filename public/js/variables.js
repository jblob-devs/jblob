var gold = 0;
selectState = false;
let save = {
    username: "",
    save: "",
    gold: 0,
    blobsUnlocked: [],
    blobTeam: [],

    //Blobs
    basicBlob: {
        level: 1,
        xp: 0,
        xpNeeded: 100,
        health: 10,
        attack: 1,
        defense: 1,
        speed: 1,
        special: 1,
        type: "basicBlob"
    }    
};
let saveString = JSON.stringify(save);
    
    