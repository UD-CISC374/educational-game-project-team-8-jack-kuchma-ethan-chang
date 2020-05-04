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

  playerMana: number;
  playerHealth: number = 30;
  enemyHealth: number = 30
  enemyMana: number = 0;
  turn: number = 0;
  explanation: GameObjects.Text;
  player_castle_health: GameObjects.Text;
  enemy_castle_health: GameObjects.Text;

  pCardGroup: Array<Card>;
  playerCard1: Card;
  playerCard2: Card;
  playerCard3: Card;
  playerCard4: Card;
  playerCard5: Card;
  eCardGroup: Phaser.GameObjects.Group;
  enemyCard1: ECard;
  enemyCard2: ECard;
  enemyCard3: ECard;
  enemyCard4: ECard;
  enemyCard5: ECard;

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
    this.eCardGroup = this.add.group({
      classType: ECard,
      maxSize: 17,
      runChildUpdate: true
    });
    
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
          /* this.pCardGroup.getChildren().forEach(function(child:Card) {
            if (child.onBoard && child.x > destroyedX && child.y == destroyedY) {
              child.x += -55;
            }
          } */
          /* for (let i of children) {
            if (i.onBoard && i.x > destroyedX && i.y == destroyedY) {
              i.x += -55;
            }
          } */
        }
        if (this.tempECard.moles <= 0) {
          console.log('ECard destroyed');
          //Deal damage to enemy castle based on excess moles
          this.enemy_castle_health.setText(String(this.enemyHealth - this.tempPCard.moles));
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
    //for (let i = 0; i < 5; i++) {
      //this.playerCard = new Card(this, 20 + (i*50), this.scale.height - 45, 'card_placeholder').setInteractive();
      this.playerCard1 = new Card(this, 20 + (0), this.scale.height - 45, 'card_placeholder',4)
      this.playerCard2 = new Card(this, 20 + (50), this.scale.height - 45, 'card_placeholder',5)
      this.playerCard3 = new Card(this, 20 + (100), this.scale.height - 45, 'card_placeholder',5)
      this.playerCard4 = new Card(this, 20 + (150), this.scale.height - 45, 'card_placeholder',7)
      this.playerCard5 = new Card(this, 20 + (200), this.scale.height - 45, 'card_placeholder',8)
      //this.pCardGroup.push(this.playerCard1, this.playerCard2, this.playerCard3, this.playerCard4, this.playerCard5);

      this.enemyCard1 = new ECard(this, 370 + (0), 40, 'card_placeholder',6);
      this.enemyCard2 = new ECard(this, 370 + (50), 40, 'card_placeholder',5);
      this.enemyCard3 = new ECard(this, 370 + (100), 40, 'card_placeholder',4);
      this.enemyCard4 = new ECard(this, 370 + (150), 40, 'card_placeholder',3);
      this.enemyCard5 = new ECard(this, 370 + (200), 40, 'card_placeholder',5);
      // console.log(this.pCardGroup.getChildren());
      //}
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
  /* realign(key, x, y, shift) {
    if (key === 'p') {
      this.pCardGroup.getChildren().forEach(child => {
        if (child.data.values.onBoard) {
          console.log('realign');
        }
      });
    }
  } */

  /* react() {
    this.tempPCard.moles = this.tempPCard.moles - this.tempECard.moles;
    if (this.tempPCard.moles <= 0) {
      this.tempPCard.destroy();
    }
    this.tempECard.moles = this.tempECard.moles - this.tempPCard.moles;
    if (this.tempECard.moles <= 0) {
      this.tempECard.destroy();
    }
    this.tempPCard;
    this.tempECard;
    console.log("reaction");
  } */


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

    this.playerCard1.attack.x = this.playerCard1.x - 20;
    this.playerCard1.attack.y = this.playerCard1.y;
    this.playerCard2.attack.x = this.playerCard2.x - 20;
    this.playerCard2.attack.y = this.playerCard2.y;
    this.playerCard3.attack.x = this.playerCard3.x - 20;
    this.playerCard3.attack.y = this.playerCard3.y;
    this.playerCard4.attack.x = this.playerCard4.x - 20;
    this.playerCard4.attack.y = this.playerCard4.y;
    this.playerCard5.attack.x = this.playerCard5.x - 20;
    this.playerCard5.attack.y = this.playerCard5.y;

    this.playerCard1.cardType.x = this.playerCard1.x - 20;
    this.playerCard1.cardType.y = this.playerCard1.y - 10;
    this.playerCard2.cardType.x = this.playerCard2.x - 20;
    this.playerCard2.cardType.y = this.playerCard2.y - 10;
    this.playerCard3.cardType.x = this.playerCard3.x - 20;
    this.playerCard3.cardType.y = this.playerCard3.y - 10;
    this.playerCard4.cardType.x = this.playerCard4.x - 20;
    this.playerCard4.cardType.y = this.playerCard4.y - 10;
    this.playerCard5.cardType.x = this.playerCard5.x - 20;
    this.playerCard5.cardType.y = this.playerCard5.y - 10;

    this.enemyCard1.attack.x = this.enemyCard1.x - 20;
    this.enemyCard1.attack.y = this.enemyCard1.y;
    this.enemyCard2.attack.x = this.enemyCard2.x - 20;
    this.enemyCard2.attack.y = this.enemyCard2.y;
    this.enemyCard3.attack.x = this.enemyCard3.x - 20;
    this.enemyCard3.attack.y = this.enemyCard3.y;
    this.enemyCard4.attack.x = this.enemyCard4.x - 20;
    this.enemyCard4.attack.y = this.enemyCard4.y;
    this.enemyCard5.attack.x = this.enemyCard5.x - 20;
    this.enemyCard5.attack.y = this.enemyCard5.y;

    this.enemyCard1.cardType.x = this.enemyCard1.x - 20
    this.enemyCard1.cardType.y = this.enemyCard1.y - 10;
    this.enemyCard2.cardType.x = this.enemyCard2.x - 20
    this.enemyCard2.cardType.y = this.enemyCard2.y - 10;
    this.enemyCard3.cardType.x = this.enemyCard3.x - 20
    this.enemyCard3.cardType.y = this.enemyCard3.y - 10;
    this.enemyCard4.cardType.x = this.enemyCard4.x - 20
    this.enemyCard4.cardType.y = this.enemyCard4.y - 10;
    this.enemyCard5.cardType.x = this.enemyCard5.x - 20
    this.enemyCard5.cardType.y = this.enemyCard5.y - 10;
  }
}