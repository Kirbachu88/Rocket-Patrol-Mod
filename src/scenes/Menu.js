// Capitalized because scenes in Phaser are classes
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        // Load images/tile sprites
        this.load.image('titlescreen', './assets/titlescreen.png');

        // Load audio
        this.load.audio('sfx_select', './assets/blip_select.wav');
        this.load.audio('sfx_explosion1', './assets/explosion1.wav');
        this.load.audio('sfx_explosion2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/explosion4.wav');
        this.load.audio('sfx_explosion5', './assets/explosion5.wav');
        this.load.audio('sfx_rocket', './assets/takeoff.wav');
        this.load.audio('bgm', './assets/02 HoliznaCC0 - Level 3 - Lowered Volume.mp3');
    }

    create() {
        // Place titlescreen sprite
        this.titlescreen = this.add.image(0, 0, 'titlescreen').setOrigin(0, 0);

        // Menu text configuration
        // let menuConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3B141',
        //     color: '#843605',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5
        //     },
        //     fixedWidth: 0
        // }

        // // Show Menu text
        // this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to Fire', menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = '#00FF00';
        // menuConfig.color = '#000';
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // Define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);    
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // Novice mode
            this.game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Expert mode
            this.game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}