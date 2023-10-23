/***********************************************/
/* Author: Angela Ku
/* Title:  Rocket Patrol Mod
/* Time:   ?
/* Mods List
/* 1-Point Tier
/* 
/* 
/* 3-Point Tier
/* 
/* 
/* 5-Point Tier
/* 
/* 
/* Citations
/* - Class checking: "instanceof" - https://javascript.info/instanceof
/***********************************************/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

// Reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

let game = new Phaser.Game(config);

// Set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;