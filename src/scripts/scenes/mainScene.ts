import { GameObjects } from 'phaser';
import Card from '../objects/card';
import ECard from '../objects/ecard';
import Zone from '../objects/zone';

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;
  player_castle: Phaser.GameObjects.Image;
  enemy_castle: Phaser.GameObjects.Image;
  card:Phaser.GameObjects.Image;
  endTurn: Phaser.GameObjects.Text;
  dealt: boolean = false;

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

    this.explanation = this.add.text(10,80,"These cards are either an acid or base. \nThe cards contain stats of moles. " + 
    "\nMoles is the card's health as well as the damage done to other cards. \nWhen attacking, if your card is the excess reagent," + 
    "\ndamage is done to the enemy castle based on your excess moles. \n Drag cards onto the board, then click it and an enemy card to react them." + 
    "\nTake the enemy's health to 0.",{fontSize: '10px', fill: '#000'});
    
    this.zone = new Zone(this, 300, 250, 420, 80);
    this.endTurn = this.add.text(this.scale.width - 90, this.scale.height/2 - 20, 'END TURN', {font: '16px Arial', fill: 'white'}).setInteractive();

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

    this.endTurn.on('pointerdown', () => {
      if (!this.dealt) {
        this.playerCard = new Card(this, 20 + (this.pCardHand*50), this.scale.height - 45, 'card_placeholder', Math.floor(4 * Math.random() + 2));
      }
      this.dealt = true;
      this.turn = 2;
    })
    this.endTurn.on('pointerover', () => {
      this.endTurn.setColor('#ff69b4');
    })
    this.endTurn.on('pointerout', () => {
      this.endTurn.setColor('white');
    })
  }

  dealCards() {
    console.log("dealt cards");
    for (let i = 0; i < 4; i++) {
      this.playerCard = new Card(this, 20 + (i*50), this.scale.height - 45, 'card_placeholder', Math.floor(4 * Math.random() + 2));
      this.enemyCard = new ECard(this, 370 + (i*50), 40, 'card_placeholder', Math.floor(4 * Math.random() + 1));
      }
  }

  playerTurn() {

  }

  enemyTurn() {
    this.dealt = false;
    this.turn = 1;
  }

  update() {
    if (this.turn == 1) {
      this.playerTurn();
      if (this.playerManaMax < 10) {
        this.playerManaMax += 1;
      }
    } else if (this.turn == 2) {
      this.enemyTurn();
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