import { GameObjects } from 'phaser';
import Card from '../objects/card';
import Zone from '../objects/zone';

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;
  player_castle: Phaser.GameObjects.Image;
  enemy_castle: Phaser.GameObjects.Image;
  card:Phaser.GameObjects.Image;

  zone1: Phaser.GameObjects.Zone;
  zone2: Phaser.GameObjects.Zone;
  zone3: Phaser.GameObjects.Zone;
  zone4: Phaser.GameObjects.Zone;
  zone5: Phaser.GameObjects.Zone;
  zone6: Phaser.GameObjects.Zone;
  zone7: Phaser.GameObjects.Zone;

  playerMana: number;
  enemyMana: number = 0;
  turn: number = 0;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    let self = this;


    this.background = this.add.image(0, 0, "grass");
    this.background.setOrigin(0, 0);
    this.player_castle = this.add.image(this.scale.width/2, this.scale.height - 45, "player_castle");
    this.enemy_castle = this.add.image(this.scale.width/2, 40, "enemy_castle");
    //this.card = this.add.image(this.scale.width/2,40,"placeholder");
    //this.card.setInteractive();
    this.input.on('pointerdown',this.startDrag,this);

    this.dealCards();

    this.zone1 = new Zone(this, 90, 250, 60, 80);
    this.zone2 = new Zone(this, 160, 250, 60, 80);
    this.zone3 = new Zone(this, 230, 250, 60, 80);
    this.zone4 = new Zone(this, 300, 250, 60, 80);
    this.zone5 = new Zone(this, 370, 250, 60, 80);
    this.zone6 = new Zone(this, 440, 250, 60, 80);
    this.zone7 = new Zone(this, 510, 250, 60, 80);

    this.input.on('dragstart', function(pointer, gameObject){
      gameObject.setTint(0xff69b4);
      self.children.bringToTop(gameObject);
    })

    this.input.on('dragend',function(pointer,gameObject,dropped){
      gameObject.setTint();
      if (!dropped){
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    })


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
