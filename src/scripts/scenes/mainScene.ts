import { GameObjects } from 'phaser';
import Card from '../objects/card';

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;
  player_castle: Phaser.GameObjects.Image;
  enemy_castle: Phaser.GameObjects.Image;
  card:Phaser.GameObjects.Image;

  playerMana: number;
  enemyMana: number = 0;
  turn: number = 0;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.image(0, 0, "grass");
    this.background.setOrigin(0, 0);
    this.player_castle = this.add.image(this.scale.width/2, this.scale.height - 45, "player_castle");
    this.enemy_castle = this.add.image(this.scale.width/2, 40, "enemy_castle");
    //this.card = this.add.image(this.scale.width/2,40,"placeholder");
    //this.card.setInteractive();
    this.input.on('pointerdown',this.startDrag,this);

    this.dealCards();
  }

  dealCards() {
    for (let i = 0; i < 5; i++) {
      let playerCard = new Card(this, 20 + (i*50), this.scale.height - 45, 'card_placeholder').setInteractive();
      let enemyCard = new Card(this, 370 + (i*50), 40, 'card_placeholder');
    }
  }

  startDrag(pointer, targets){
    this.input.off('pointerdown',this.startDrag,this);
    this.card = targets[0];
    this.input.on('pointermove',this.doDrag,this);
    this.input.on('pointerup',this.stopDrag,this);
  }
  doDrag(pointer){
    this.card.x = pointer.x;
    this.card.y = pointer.y;
  }
  stopDrag(){
    this.input.on('pointerdown',this.startDrag,this);
    this.input.off('pointermove',this.doDrag,this);
    this.input.off('pointerup',this.stopDrag,this);

  }
  /*playerTurn() {
    this.drawCard(this.player);
    this.turn = 2;
  }*/

  /*enemyTurn() {
    this.drawCard(this.enemy);
    this.turn = 1;
  }*/

  //This should take an argument; this.player, this.enemy; something to differentiate
  drawCard(foo) {
    //should play the animation for drawing a card from deck
    foo.count += 1;
  }



  /*update() {
    if (this.turn == 1) {
      this.playerTurn();
      if (this.playerMana < 10) {
        this.playerMana += 1;
      }
    } else if (this.turn == 2) {
      this.enemyTurn();
      if (this.enemyMana < 10) {
        this.enemyMana += 1;
      }
    }
  }*/
}
