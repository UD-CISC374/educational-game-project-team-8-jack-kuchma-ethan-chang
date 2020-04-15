export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    //Load images
    this.load.image("grass", "assets/images/grass.png");
    this.load.image("player_castle", "assets/images/player_castle.png");
    this.load.image("enemy_castle", "assets/images/enemy_castle.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}
