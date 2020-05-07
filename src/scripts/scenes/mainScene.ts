import { GameObjects } from 'phaser';
import Card from '../objects/card';
import ECard from '../objects/ecard';
import Zone from '../objects/zone';

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;
  player_castle: Phaser.GameObjects.Image;
  enemy_castle: Phaser.GameObjects.Image;
  card:Phaser.GameObjects.Image;

  zone: Phaser.GameObjects.Zone;

  playerManaMax: number = 1;
  playerHealth: number = 30;
  enemyHealth: number = 30
  enemyMana: number = 0;
  turn: number = 0;
  explanation: GameObjects.Text;
  player_castle_health: GameObjects.Text;
  enemy_castle_health: GameObjects.Text;
  pCardHand: number = 0;
  eCardHand: number = 0;

  pCardGroup: Array<Card> = [];
  playerCard: Card;
  eCardGroup: Array<ECard> = [];
  enemyCard: ECard;

  tempPCard: Card;
  tempECard: ECard;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.image(0, 0, "grass");
    this.background.setOrigin(0, 0);
    this.player_castle = this.add.image(this.scale.width/2, this.scale.height - 45, "player_castle");
    this.player_castle_health = this.add.text(320, 380, String(this.playerHealth),{fill: "#FF0000", fontWeight: "bold", backgroundColor: "#FFFFFF"});

    this.enemy_castle = this.add.image(this.scale.width/2, 40, "enemy_castle");
    this.enemy_castle_health = this.add.text(320, 60, String(this.enemyHealth), {fill: "#FF0000", fontWeight: "bold", backgroundColor: "#FFFFFF"});

    this.explanation = this.add.text(10,80,"These cards are either an acid or base. \nThe cards contain stats of molarity and moles. \nMolarity is the damage done to the player if it attack a player directly. \nMoles is the card's health as well as the damage done to other cards. \nTake the enemy's health to 0 before they do to yours",{fontSize: '10px', fill: '#000'});
    
    this.zone = new Zone(this, 300, 250, 420, 80);

    /* this.pCardGroup = this.add.group({
      classType: Card,
      maxSize: 17,
      runChildUpdate: true
    }); */
    /* this.eCardGroup = this.add.group({
      classType: ECard,
      maxSize: 17,
      runChildUpdate: true
    }); */
    
    this.dealCards();

    this.input.on('gameobjectdown', (pointer, gameObject) => {
      console.log('gameobjectdown');
      if (gameObject instanceof Card) {
        console.log('this card is a PCard');
        this.tempPCard = gameObject;
        this.tempPCard.setTint(0xff69b4);
      } else if (gameObject instanceof ECard && this.tempPCard.value != gameObject.value) { // Checks to see if ur attacking an opposite type card
        console.log('this card is a ECard');
        this.tempECard = gameObject;
        this.tempECard.setTint(0xff69b4);
        console.log(this.tempPCard.moles);//moles before reaction
        console.log(this.tempECard.moles);
        let temptemp = this.tempPCard.moles;
        this.tempPCard.moles = this.tempPCard.moles - this.tempECard.moles;
        this.tempECard.moles = this.tempECard.moles - temptemp;
        console.log(this.tempPCard.moles);//moles after reaction
        console.log(this.tempECard.moles);
        if (this.tempPCard.moles <= 0) {
          console.log('PCard destroyed');
          this.tempPCard.moles = 0;
          this.tempPCard.attack.destroy();
          this.tempPCard.cardType.destroy();
          let destroyedX = this.tempPCard.x; let destroyedY = this.tempPCard.y;
          // this.realign('p', destroyedX, destroyedY, -55);
          this.tempPCard.destroy();
          //this.zone.data.values.cards--;
          this.tempECard.attack.setText('moles: ' + String(this.tempECard.moles));
          this.tempECard.setTint();

          for (let i of this.pCardGroup) {
            if (i.onBoard && i.x > destroyedX && i.y == destroyedY) {
              i.x += -55;
            }
          }
        }
        if (this.tempECard.moles <= 0) {
          console.log('ECard destroyed');
          //Deal damage to enemy castle based on excess moles
          this.enemyHealth -= this.tempPCard.moles
          this.enemy_castle_health.setText(String(this.enemyHealth));
          this.tempECard.attack.destroy();
          this.tempECard.cardType.destroy();
          this.tempECard.destroy();
          if (this.tempPCard.attack != undefined) {
            this.tempPCard.attack.setText('moles: ' + String(this.tempPCard.moles));
            this.tempPCard.setTint();
          }
        }
      }
    })    
  }

  dealCards() {
    console.log("dealt cards");
    for (let i = 0; i < 4; i++) {
      this.playerCard = new Card(this, 20 + (i*50), this.scale.height - 45, 'card_placeholder', Math.floor(4 * Math.random() + 2));
      this.enemyCard = new ECard(this, 370 + (i*50), 40, 'card_placeholder', Math.floor(4 * Math.random() + 1));
      }
  }

  /* realign(key, x, y, shift) {
    if (key === 'p') {
      var children = this.pCardGroup.getChildren();
      for (let i of children) {
        if (i.onBoard && i.x > x && i.y == y) {
          i.x += shift;
        }
      }
    } else if (key === 'e') {
      var children = this.eCardGroup.getChildren();
      for (let j of children) {
        if (j.onBoard && j.x > x, && j.y == y) {
          j.y += shift;
        }
      }
    }
  } */


  playerTurn() {
    
    this.turn = 2;
  }

  enemyTurn() {

    this.turn = 1;
  }

  //This should take an argument; this.player, this.enemy; something to differentiate
  drawCard(foo) {
    //should play the animation for drawing a card from deck
    foo.count += 1;
  }



  update() {
    if (this.turn == 1) {
      this.playerTurn();
      if (this.playerManaMax < 10) {
        this.playerManaMax += 1;
      }
    } else if (this.turn == 2) {
      this.enemyTurn();
      if (this.enemyMana < 10) {
        this.enemyMana += 1;
      }
    }
    
    for (let i of this.pCardGroup) {
      i.attack.x = i.x - 20;
      i.attack.y = i.y;
      i.cardType.x = i.x - 20;
      i.cardType.y = i.y - 10;
    }
    for (let j of this.eCardGroup) {
      j.attack.x = j.x - 20;
      j.attack.y = j.y;
      j.cardType.x = j.x - 20;
      j.cardType.y = j.y - 10;
    }
  }
}