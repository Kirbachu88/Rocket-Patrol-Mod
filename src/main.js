/***********************************************/
/* Author: Angela Ku
/* Title:  Rocket Patrol Mod
/* Time:   12h
/*
/* Mods List
/* 1-Point Tier
/* Implement the 'FIRE' UI text from the original game
/* Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts)
/* Implement the speed increase that happens after 30 seconds in the original game
/* 
/* 3-Point Tier
/* Create 4 new explosion sound effects and randomize which one plays on impact
/* Display the time remaining (in seconds) on the screen
/* Create a new title screen (e.g., new artwork, typography, layout)
/* Implement parallax scrolling for the background
/* 
/* 5-Point Tier
/* Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
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