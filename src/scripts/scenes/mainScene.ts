import { GameObjects, Tilemaps } from 'phaser';
import Card from '../objects/card';
import ECard from '../objects/ecard';
import Zone from '../objects/zone';

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  player_castle: Phaser.GameObjects.Image;
  enemy_castle: Phaser.GameObjects.Image;
  card: Phaser.GameObjects.Image;
  endTurn: Phaser.GameObjects.Text;
  dealt: boolean = false;
  healed: boolean = false;
  round: number = 1;
  roundDisplay: Phaser.GameObjects.Text;

  zone: Phaser.GameObjects.Zone;

  playerManaMax: number = 1;
  playerHealth: number = 40;
  enemyHealth: number = 20
  enemyMana: number = 0;
  turn: number = 1;
  explanation: GameObjects.Text;
  player_castle_health: GameObjects.Text;
  enemy_castle_health: GameObjects.Text;
  pCardHand: number = 0;
  pCardBoard: number = 0;
  eCardBoard: number = 0;
  pTurnText: GameObjects.Text;
  eTurnText: GameObjects.Text;

  pCardGroup: Array<Card> = [];
  playerCard: Card;
  eCardGroup: Array<ECard> = [];
  enemyCard: ECard;
  tempPCard: Card;
  tempECard: ECard;

  private tutorialTextArray: Array<GameObjects.Text> = [];
  private tutorialMessageNumber: number = 0;
  victory: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "grass");
    this.background.setOrigin(0, 0);
    this.player_castle = this.add.image(this.scale.width/2, this.scale.height - 45, "player_castle");
    this.player_castle_health = this.add.text(320, 380, String(this.playerHealth),{fill: "#FF0000", fontWeight: "bold", backgroundColor: "#FFFFFF"});

    this.enemy_castle = this.add.image(this.scale.width/2, 40, "enemy_castle");
    this.enemy_castle_health = this.add.text(320, 60, String(this.enemyHealth), {fill: "#FF0000", fontWeight: "bold", backgroundColor: "#FFFFFF"});
    
    this.zone = new Zone(this, 300, 250, 420, 80);
    this.endTurn = this.add.text(this.scale.width - 90, this.scale.height/2 - 20, 'END TURN', {font: '16px Arial', fill: 'white'}).setInteractive();
    this.victory = this.sound.add("victory");

    this.pTurnText = this.add.text(10, 10, "Your turn", {fill: 'magenta', font: "12px Arial"});
    this.eTurnText = this.add.text(10, 10, "Enemy turn", {fill: 'red', font: '12px arial'});
    this.pTurnText.setVisible(false);
    this.eTurnText.setVisible(false);

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
    this.roundDisplay = this.add.text(this.scale.width - 80, 10, "Round: " + String(this.round), {fill: 'black', font: '14px Arial'});

    this.input.on('gameobjectdown', (pointer, gameObject) => {
      if (gameObject instanceof Card) {
        console.log('this card is a PCard');
        if (this.tempPCard != undefined) {
          this.tempPCard.setTint();
        }
        this.tempPCard = gameObject;
        this.tempPCard.setTint(0xff69b4);
      } else if (gameObject instanceof ECard && this.tempPCard.value != gameObject.value) { // Checks to see if ur attacking an opposite type card
        console.log('this card is a ECard');
        this.tempECard = gameObject;
        this.tempECard.setTint(0xff69b4);

        if (this.tempPCard.value == 1) {
          let eq = this.add.text(10, 80, String(this.tempPCard.moles) + " moles Acid - " + String(this.tempECard.moles) + " moles Base", {fill: 'black', font: '16px Arial'});
          this.time.delayedCall(1000, () => {
            this.tweens.add({
              targets: eq,
              duration: 500,
              alpha: 0,
              onComplete: () => eq.destroy()
            });
          })
        } else {
          let eq = this.add.text(10, 80, String(this.tempPCard.moles) + " moles Base - " + String(this.tempECard.moles) + " moles Acid", {fill: 'black', font: '16px Arial'});
          this.time.delayedCall(1500, () => {
            this.tweens.add({
              targets: eq,
              duration: 1500,
              alpha: 0,
              onComplete: () => eq.destroy()
            });
          })
        }

        let temptemp = this.tempPCard.moles;
        this.tempPCard.moles = this.tempPCard.moles - this.tempECard.moles;
        this.tempECard.moles = this.tempECard.moles - temptemp;

        if (this.tempPCard.moles <= 0) {
          console.log('PCard destroyed');
          this.tempPCard.moles = 0;
          this.tempPCard.attack.destroy();
          this.tempPCard.cardType.destroy();
          this.tempPCard.heal.destroy();
          let destroyedX = this.tempPCard.x; let destroyedY = this.tempPCard.y;
          //delete this.pCardGroup[this.pCardGroup.indexOf(this.tempPCard)];
          const index = this.pCardGroup.indexOf(this.tempPCard);
          if (index > -1) {
            this.pCardGroup.splice(index, 1);
          }
          this.tempPCard.destroy();
          this.pCardBoard -= 1;
          this.tempECard.attack.setText('moles: ' + String(this.tempECard.moles));
          this.tempECard.setTint();
          //shifts player cards on the board
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
          //this.tempECard.heal.destroy();
          let destroyedX = this.tempECard.x; let destroyedY = this.tempECard.y;
          const index = this.eCardGroup.indexOf(this.tempECard);
          if (index > -1) {
            this.eCardGroup.splice(index, 1);
          }
          this.tempECard.destroy();
          this.eCardBoard -= 1;
          //shifts enemy cards on the board
          for (let j of this.eCardGroup) {
            if (j.onBoard && j.x > destroyedX && j.y == destroyedY) {
              j.x += -50;
            }
          }
          if (this.tempPCard.attack != undefined) {
            this.tempPCard.attack.setText('moles: ' + String(this.tempPCard.moles));
            this.tempPCard.setTint();
          }
        }
      }
    })

    this.endTurn.on('pointerdown', () => {
      this.turn = 2;
      this.round += 1;
      this.healed = false;
    })
    this.endTurn.on('pointerover', () => {
      this.endTurn.setColor('#ff69b4');
    })
    this.endTurn.on('pointerout', () => {
      this.endTurn.setColor('white');
    })

    //this.input.mouse.disableContextMenu();
    this.input.on('gameobjectdown', (pointer, gameObject) => {
    if (gameObject instanceof Card && gameObject.onBoard && pointer.rightButtonDown() && !this.healed) {
        console.log('healed');
        //gameObject.setTint(0x00A86B);
        let molarity = gameObject.moles / gameObject.volume;
        this.playerHealth = this.playerHealth + molarity;
        this.player_castle_health.setText(String(this.playerHealth));
        this.healed = true;
        let heal = this.add.text(10, 80, String(gameObject.moles) + " moles / " + String(gameObject.volume) + " liters = " + String(molarity) + "M", {fill: 'black', font: '16px Arial'});
        this.time.delayedCall(1500, () => {
          this.tweens.add({
            targets: heal,
            duration: 1500,
            alpha: 0,
            onComplete: () => heal.destroy()
          });
        })
      } else if (this.healed && gameObject instanceof Card && gameObject.onBoard && pointer.rightButtonDown()) {
        let error = this.add.text(10,80, 'You have already healed this turn', {fill: 'black', font: '16px Arial'});
        this.time.delayedCall(1500, () => {
          this.tweens.add({
            targets: error,
            duration: 1500,
            alpha: 0,
            oncComplete: () => error.destroy()
          });
        })
      }
    })
  }

  makeText(text: string, x: number, y: number) {
    let textDisplay = this.add.text(0, 0, text, {fill: "black", font: "bold 12px Serif"});
    textDisplay.setBackgroundColor("tan");
    textDisplay.setX((this.scale.width/2) - (textDisplay.width/2) + x);
    textDisplay.setY((this.scale.height/2) - (textDisplay.height/2) + y);
    textDisplay.setInteractive();
    textDisplay.on("pointerdown", () => {
      textDisplay.destroy();
      this.tutorialTextArray.pop();
    });
    this.tutorialTextArray.push(textDisplay);
  }

  runTutorial(messageNumber: number): void {
    let handCardText: string = "These cards are either acid or base.                                                  [Click]\n Mole is the card's health as well as the damage done to the other cards.";
    let molarity: string  = "Your cards also have volume, which you can calculate to get molarity (moles/volume), which can heal you. \nRight click one of your cards to calculate molarity"
    let fieldText: string = "This is the battlefield where you can drag and drop cards.\n When it's on the board, click on your card then an enemy card to attack."
    let attackText: string = "When attacking, if your card is the excess reagent,\n damage is done to the enemy castle based on your excess moles."
    let winText: string  = "Take the enemy castle's health down to 0 to win!"
    let stringList: Array<string> = [handCardText, molarity, fieldText, attackText, winText];
    if (messageNumber > stringList.length-1)
      return;
    switch(messageNumber) {
      case 0: // handCard Text
        this.makeText(stringList[messageNumber], -110, 100); // Display it above the cards
        break;
      case 1:
        this.makeText(stringList[messageNumber], 0,100); //Display it above the cards
        break;
      case 2: // field Text
        this.makeText(stringList[messageNumber], -110, 40); // Display it in the battlefield
        break;
      case 3: // attack Text
        this.makeText(stringList[messageNumber], -110, 40);//Display in the battlefield
        break;
      case 4: // winText
        this.makeText(stringList[messageNumber], 176, -150);//Display right of castle
        break;
    }
  }

  dealCards() {
    console.log("dealt cards");
    for (let i = 0; i < 2; i++) {
      let r = Math.random();
      if (r > 0.5) {
        this.playerCard = new Card(this, 20 + (i*50), this.scale.height - 45, 'red_flask', Math.floor(4 * Math.random() + 2),Math.floor(4 * Math.random() + 2));
        this.enemyCard = new ECard(this, 120 + (i*50), this.scale.height/2 - 40, 'blue_flask', Math.floor(4 * Math.random() + 1),Math.floor(4 * Math.random() + 2));
      } else {
        this.playerCard = new Card(this, 20 + (i*50), this.scale.height - 45, 'blue_flask', Math.floor(4 * Math.random() + 2), Math.floor(4 * Math.random() + 2));
        this.enemyCard = new ECard(this, 120 + (i*50), this.scale.height/2 - 40, 'red_flask', Math.floor(4 * Math.random() + 1),Math.floor(4 * Math.random() + 2));
      }
    }
  }

  playerTurn() {
    this.roundDisplay.setText("Round: " + String(this.round));
    this.pTurnText.setVisible(true);
    this.eTurnText.setVisible(false);
    if (!this.dealt) {
      let r = Math.random();
      if (r > 0.5) {
        this.playerCard = new Card(this, 20 + (this.pCardHand*50), this.scale.height - 45, 'red_flask', Math.floor(4 * Math.random() + 2),Math.floor(4 * Math.random() + 2));
      } else {
        this.playerCard = new Card(this, 20 + (this.pCardHand*50), this.scale.height - 45, 'blue_flask', Math.floor(4 * Math.random() + 2),Math.floor(4 * Math.random() + 2));
      }
    }
    this.dealt = true;
  }

  enemyTurn() {
    this.pTurnText.setVisible(false);
    this.eTurnText.setVisible(true);
    if (this.dealt) {
      let r = Math.random();
      if (r > 0.5) {
        this.enemyCard = new ECard(this, 120 + (this.eCardBoard*50), this.scale.height/2 - 40, 'red_flask', Math.floor(4 * Math.random() + 1),Math.floor(4 * Math.random() + 1));
      } else {
        this.enemyCard = new ECard(this, 120 + (this.eCardBoard*50), this.scale.height/2 - 40, 'blue_flask', Math.floor(4 * Math.random() + 1),Math.floor(4 * Math.random() + 1));
      }
      let totdmg = 0;
      for (let j of this.eCardGroup) {
        if (j.onBoard) {
          totdmg = totdmg + j.moles;
          this.time.delayedCall(500, this.attack, [j, j.x, j.y], this);
          this.playerHealth = this.playerHealth - j.moles;
          this.player_castle_health.setText(String(this.playerHealth));
        }
      }
      let dmgmark = this.add.text(this.player_castle.x+50, this.player_castle.y, "-" + String(totdmg) + " (from moles)", {fill: 'red', font: '16px Arial'});
      this.time.delayedCall(2000, () => {
        this.tweens.add({
          targets: dmgmark,
          duration: 1500,
          alpha: 0,
          onComplete: () => dmgmark.destroy()
        });
      })
      if (this.playerHealth <= 0) {
        this.add.text(this.scale.width/2 -90, this.scale.height/2-105, 'Better luck next time', {font: '24px Arial', fill: 'red'});
      }
    }
    this.dealt = false;
    this.turn = 1;
  }
  
  attack(card,x,y) {
    this.tweens.add({
      targets: card,
      ease: 'Linear',
      duration: 300,
      repeat: 0,
      x: this.player_castle.x,
      y: this.player_castle.y,
      onComplete: () => {
        this.tweens.add({
          targets: card,
          ease: 'Linear',
          duration: 200,
          repeat: 0,
          x: x,
          y: y
        });
      }
    });
  }

  update() {
    if (this.turn == 1) {
      this.time.delayedCall(1000, this.playerTurn, [], this);
      //this.playerTurn();
      if (this.playerManaMax < 10) {
        this.playerManaMax += 1;
      }
    } else if (this.turn == 2) {
      this.time.delayedCall(1000, this.enemyTurn, [], this);
      //this.enemyTurn();
    }
    if (this.enemyHealth <= 0) {
      this.victory.play();
      this.add.text(this.scale.width/2 -50, this.scale.height/2-105, 'YOU WIN!!!', {font: '24px Arial', fill: 'magenta'});
    }
    
    for (let i of this.pCardGroup) {
      i.attack.x = i.x - 20;
      i.attack.y = i.y;

      i.cardType.x = i.x - 20;
      i.cardType.y = i.y - 25;

      i.heal.x = i.x-20;
      i.heal.y = i.y+10
    }
    for (let j of this.eCardGroup) {
      j.attack.x = j.x - 20;
      j.attack.y = j.y;

      j.cardType.x = j.x - 20;
      j.cardType.y = j.y - 25;

      //j.heal.x = j.x-20;//volume text
      //j.heal.y = j.y+10;

    }

    if (!this.tutorialTextArray.length) {
      this.runTutorial(this.tutorialMessageNumber);
      this.tutorialMessageNumber++;
    }
  }
}