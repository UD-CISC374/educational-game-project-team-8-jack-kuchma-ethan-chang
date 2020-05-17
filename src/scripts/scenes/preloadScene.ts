export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    //Load images
    this.load.image("grass", "assets/images/grass.png");
    this.load.image("player_castle", "assets/images/player_castle.png");
    this.load.image("enemy_castle", "assets/images/enemy_castle.png");
    this.load.audio("music", ["assets/sounds/boomsong.ogg","assets/sounds/boomsong.mp3"]);
    this.load.audio("victory", ["assets/sounds/victory_jingle.ogg"]);
    this.load.spritesheet("card_placeholder","assets/images/Card1.png", {
      frameWidth: 40,
      frameHeight: 52
    });
    this.load.spritesheet("blue_flask", "assets/images/Blue_flask.png", {
      frameWidth: 40,
      frameHeight: 52
    });
    this.load.spritesheet("red_flask", "assets/images/Red_flask.png", {
      frameWidth: 40,
      frameHeight: 52
    });
  }

  create() {
    this.scene.start('MainScene');
  }
}
