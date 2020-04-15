export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    //Load images
    this.load.image("grass", "assets/images/grass.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}
