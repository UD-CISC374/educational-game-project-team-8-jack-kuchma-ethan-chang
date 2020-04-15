import { GameObjects } from 'phaser';

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;
  player_castle: Phaser.GameObjects.Image;
  enemy_castle: Phaser.GameObjects.Image;

  turn: number;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.image(0, 0, "grass");
    this.background.setOrigin(0, 0);
    this.player_castle = this.add.image(this.scale.width/2, this.scale.height - 45, "player_castle");
    this.enemy_castle = this.add.image(this.scale.width/2, 40, "enemy_castle");

  }

  playerTurn() {
    this.drawCard(this.player);
    this.turn = 2;
  }

  enemyTurn() {
    this.drawCard(this.enemy);
    this.turn = 1;
  }

  //This should take an argument; this.player, this.enemy; something to differentiate
  drawCard(foo) {
    foo.count += 1;
  }

  update() {
    if (this.turn == 1) {
      this.playerTurn();
    } else if (this.turn == 2) {
      this.enemyTurn();
    }
  }
}
