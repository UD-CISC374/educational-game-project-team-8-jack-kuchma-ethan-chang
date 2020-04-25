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
  playerHealth: number = 30;
  enemyHealth: number = 30
  enemyMana: number = 0;
  turn: number = 0;
  explanation: GameObjects.Text;
  player_castle_health: GameObjects.Text;
  enemy_castle_health: GameObjects.Text;

  pCardGroup: Phaser.GameObjects.Group;
  playerCard1: Card;
  playerCard2: Card;
  playerCard3: Card;
  playerCard4: Card;
  playerCard5: Card;
  eCardGroup: Phaser.GameObjects.Group;
  enemyCard1: Card;
  enemyCard2: Card;
  enemyCard3: Card;
  enemyCard4: Card;
  enemyCard5: Card;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    let self = this;

    this.background = this.add.image(0, 0, "grass");
    this.background.setOrigin(0, 0);
    this.player_castle = this.add.image(this.scale.width/2, this.scale.height - 45, "player_castle");
    this.player_castle_health = this.add.text(320, 380, String(this.playerHealth),{fill: "#FF0000", fontWeight: "bold", backgroundColor: "#FFFFFF"});

    this.enemy_castle = this.add.image(this.scale.width/2, 40, "enemy_castle");
    this.enemy_castle_health = this.add.text(320, 60, String(this.enemyHealth), {fill: "#FF0000", fontWeight: "bold", backgroundColor: "#FFFFFF"});

    this.explanation = this.add.text(10,80,"These cards are either an acid or base. \nThe cards contain stats of molarity and moles. \nMolarity is the damage done to the player if it attack a player directly. \nMoles is the card's health as well as the damage done to other cards. \nTake the enemy's health to 0 before they do to yours",{fontSize: '10px', fill: '#000'});
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

    this.physics.add.overlap(this.pCardGroup, this.pCardGroup, this.react, undefined, this);
  }

  dealCards() {
    console.log("dealt cards");
    //for (let i = 0; i < 5; i++) {
      //this.playerCard = new Card(this, 20 + (i*50), this.scale.height - 45, 'card_placeholder').setInteractive();
      this.playerCard1 = new Card(this, 20 + (0), this.scale.height - 45, 'card_placeholder').setInteractive();
      this.playerCard2 = new Card(this, 20 + (50), this.scale.height - 45, 'card_placeholder').setInteractive();
      this.playerCard3 = new Card(this, 20 + (100), this.scale.height - 45, 'card_placeholder').setInteractive();
      this.playerCard4 = new Card(this, 20 + (150), this.scale.height - 45, 'card_placeholder').setInteractive();
      this.playerCard5 = new Card(this, 20 + (200), this.scale.height - 45, 'card_placeholder').setInteractive();
      //let enemyCard = new Card(this, 370 + (i*50), 40, 'card_placeholder');
      this.enemyCard1 = new Card(this, 370 + (0), 40, 'card_placeholder');
      this.enemyCard2 = new Card(this, 370 + (50), 40, 'card_placeholder');
      this.enemyCard3 = new Card(this, 370 + (100), 40, 'card_placeholder');
      this.enemyCard4 = new Card(this, 370 + (150), 40, 'card_placeholder');
      this.enemyCard5 = new Card(this, 370 + (200), 40, 'card_placeholder');

      this.pCardGroup = this.add.group({
        classType: Card,
        maxSize: 15,
        runChildUpdate: true
      });
    //}
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

  react(playerCard, enemyCard) {
    playerCard.molarity = playerCard.molarity - enemyCard.molarity;
    if (playerCard.molarity <= 0) {
      playerCard.destroy();
    }
    enemyCard.molarity = enemyCard.molarity - playerCard.molarity;
    if (enemyCard.molarity <= 0) {
      enemyCard.destroy();
    }
    console.log("reaction");
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



  update() {
    /* if (this.turn == 1) {
      this.playerTurn();
      if (this.playerMana < 10) {
        this.playerMana += 1;
      }
    } else if (this.turn == 2) {
      this.enemyTurn();
      if (this.enemyMana < 10) {
        this.enemyMana += 1;
      }
    } */

    this.playerCard1.attack.x = this.playerCard1.x -15;
    this.playerCard1.attack.y = this.playerCard1.y;
    this.playerCard2.attack.x = this.playerCard2.x -15;
    this.playerCard2.attack.y = this.playerCard2.y;
    this.playerCard3.attack.x = this.playerCard3.x -15;
    this.playerCard3.attack.y = this.playerCard3.y;
    this.playerCard4.attack.x = this.playerCard4.x -15;
    this.playerCard4.attack.y = this.playerCard4.y;
    this.playerCard5.attack.x = this.playerCard5.x -15;
    this.playerCard5.attack.y = this.playerCard5.y;

    this.enemyCard1.attack.x = this.enemyCard1.x -15;
    this.enemyCard1.attack.y = this.enemyCard1.y;
    this.enemyCard2.attack.x = this.enemyCard2.x -15;
    this.enemyCard2.attack.y = this.enemyCard2.y;
    this.enemyCard3.attack.x = this.enemyCard3.x -15;
    this.enemyCard3.attack.y = this.enemyCard3.y;
    this.enemyCard4.attack.x = this.enemyCard4.x -15;
    this.enemyCard4.attack.y = this.enemyCard4.y;
    this.enemyCard5.attack.x = this.enemyCard5.x -15;
    this.enemyCard5.attack.y = this.enemyCard5.y;
  }
}