// Capitalized because scenes in Phaser are classes
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('scoutship', './assets/scoutship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('mountains', './assets/mountains.png');
        this.load.image('trees', './assets/trees.png');

        // Load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('scoutExplosion', './assets/scoutexplosion.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // Place tile sprites
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.mountains = this.add.tileSprite(0, 0, 640, 480, 'mountains').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, 640, 480, 'trees').setOrigin(0, 0);

        // Add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        
        // Add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width,                    borderUISize * 7 + borderPadding * 6, 'spaceship', 0, 10).setOrigin(0, 0);

        // Add scoutship
        this.scoutship01 = new Scoutship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'scoutship', 0, 50).setOrigin(0, 0);

        // x-coordinate, y-coordinate, width, height, color (hexadecimal)
        // Green UI Background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
        // White borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0XFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        // Define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        // Animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'scoutExplode',
            frames: this.anims.generateFrameNumbers('scoutExplosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // Initialize score
        this.p1Score = 0;
    
        // Display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        // Initialize 'FIRE' text
        this.fire = ''

        // Display 'FIRE'
        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 70
        }
        this.fireCenter = this.add.text(game.config.width / 2, borderUISize + borderPadding * 2, this.fire, fireConfig);


        // Initialize time
        this.timeRemaining = game.settings.gameTimer / 1000

        // Display time
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 50
        }
        this.timeRight = this.add.text(game.config.width - borderUISize - borderPadding - timeConfig.fixedWidth, borderUISize + borderPadding * 2, this.timeRemaining, timeConfig);
  
        // GAME OVER flag
        this.gameOver = false;

        // 60-Second Play Clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            bgm.destroy();
            this.gameOver = true;
        }, null, this);

        // 30-Second Speed Up
        this.speedUp = this.time.delayedCall(30000, () => {
            this.ship01.moveSpeed++;
            this.ship02.moveSpeed++;
            this.ship03.moveSpeed++;
            this.scoutship01.moveSpeed++;
        })

        // Background Music
        let bgm = this.sound.add('bgm');
        bgm.play();
    }

    update() {
        // Check key input for Restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(); 
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 1;
        this.mountains.tilePositionX -= 2;
        this.trees.tilePositionX -= 3;

        if (!this.gameOver) {
            this.p1Rocket.update();     // Update rocket sprite
            this.ship01.update();       // Update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.scoutship01.update();  // Update scoutship
        }

        // Check Collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.scoutship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.scoutship01);
        }

        // Display 'FIRE'
        if (this.p1Rocket.isFiring) {
            this.fireCenter.text = 'FIRE'
            this.fireCenter.alpha = 1
        } else {
            this.fireCenter.text = ''
            this.fireCenter.alpha = 0
        }

        // Update timer
        this.timeRight.setText(Math.ceil(this.clock.getOverallRemainingSeconds()));
    }

    checkCollision(rocket, ship) {
        // Simple Axis-Aligned Bounding Boxes (AABB) Checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship) {
        // Temporarily hide ship
        ship.alpha = 0;

        // Create explosion sprite at ship's position
        let boom;
        if (ship instanceof Scoutship) {
            boom = this.add.sprite(ship.x, ship.y, 'scoutExplosion').setOrigin(0, 0);
            boom.anims.play('scoutExplode');    // Play explode animation
        } else {
            boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode');         // Play explode animation
        }
        boom.on('animationcomplete', () => {    // Callback after anim completes
            ship.reset()                        // Reset ship position
            ship.alpha = 1;                     // Make ship visible again
            boom.destroy();                     // Remove explosion sprite
        });
        // Score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        // Time add
        
        
        // Play explosion sound effect
        // Sound config
        let explosions = [
            'sfx_explosion1',
            'sfx_explosion2',
            'sfx_explosion3',
            'sfx_explosion4',
            'sfx_explosion5'
        ]
        this.sound.play(explosions[Math.floor(Math.random() * explosions.length)]);
    }
}