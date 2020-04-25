export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    //Load images
    this.load.image("grass", "assets/images/grass.png");
    this.load.image("player_castle", "assets/images/player_castle.png");
    this.load.image("enemy_castle", "assets/images/enemy_castle.png");
    this.load.spritesheet("card_placeholder","assets/images/Card1.png", {
      frameWidth: 40,
      frameHeight: 52
    });
  }

  create() {
    this.scene.start('MainScene');
  }
}
