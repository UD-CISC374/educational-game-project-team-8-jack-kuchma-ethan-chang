import { GameObjects } from 'phaser';

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.image(0, 0, "grass");
    this.background.setOrigin(0, 0);

  }

  update() {
  }
}
