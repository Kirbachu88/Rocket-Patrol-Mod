// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Add object to existing scene
        /*  
            Because we're extending Phaser's base Sprite class,
            it cannot add our sprite to the scene automatically.
            Instead, we have to manually add `this`, 
            whose current context is the Rocket object,
            to the scene that we pass in as a parameter.
        */
        scene.add.existing(this);                       // Add to existing, displayList, updateList
        this.isFiring = false;                          // Track rocket's firing status
        this.moveSpeed = 2;                             // Pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket')  // Add rocket SFX
    }
    
    update() {
        // Left/Right movement
        if(!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // Fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // Play SFX
        }

        // If fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // Reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    // Reset Rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}