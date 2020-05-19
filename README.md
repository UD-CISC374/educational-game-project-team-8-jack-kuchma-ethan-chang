# Title: NaCl The Base is Under Assault

# Elevator Pitch
Ethan: We created a card game that revolves around chemistry. More specifically -- excess and limiting reactants, acid-base reactions, and calculating molarity.

Jack: The player plays cards from their hand. Then, the cards on the board can be interacted with.

Ethan: Cards are of two types -- acid and base. An acid card can only attack a base card and vice versa. Additionally, each card has stats of moles. If the player is the one with excess moles when attacking a card, the excess moles is converted to damage against the castle. The player's cards also has a volume stat, used for calculating molarity.

Jack: Right clicking your card will heal your castle based on it's molarity. Every enemy's turn, their cards will damage your castle for each card's moles. When your castle reaches 0, you lose. When the enemy's castle health goes to 0, the player wins.

# Basic Instructions
Go through the instructions; click on each instruction box to read the next instruction.
Drag cards onto the board. Then left click it and an enemy card of opposite type to attack it. If your card has excess moles, damage is done to the enemy castle based on how many moles are left over.
Once per turn, you can right click your card on the board to heal your castle by a certain amount, namely the molarity of the card.
Note: molarity = moles / volume
Take the enemy's health to 0 and you win. If your health goes to 0, you lose.

# Screenshot
![Large Screenshot](https://github.com/UD-CISC374/educational-game-project-team-8-jack-kuchma-ethan-chang/tree/master/src/assets/screenshots/large.png)

# educational-phaser-game-template

Template for designing educational Phaser Games

# Important Files

These files are for coding your game:

* [src/scripts/MainScene.ts](src/scripts/MainScene.ts): The starting file of your game.

These files are for documenting your game:
 
* [egdd.md](egdd.md): The educational game design document describing this game in more depth.

These [package.json](package.json) settings are for configuring the metadata of your game and should be updated:

* `name`: educational-game-project-team-8-jack-kuchma-ethan-chang
* `description`: A game about moles, molarity, volume, acids, bases, and taking down the enemy's castle.
* `game`:
    * `url`: educational-game-project-team-8-jack-kuchma-ethan-chang
    * `shortName`:ChemCards
    * `name`: NaCl The Base is Under Assault
* `repository`:
    * `url`: https://github.com/UD-CISC374/educational-game-project-team-8-jack-kuchma-ethan-chang
* `homepage`: https://github.com/UD-CISC374/educational-game-design-document-team-8-jack-kuchma-ethan-chang
*`video url`:https://youtu.be/28tN_4gUb34
* `contributors`: `"Jacob Kuchma <jkuchma@udel.edu>", "Ethan Chang <etchang@udel.edu>"`.

You should edit the following images to create icons for your game, if it gets installed as a [Progressive Web App](https://medium.com/@amberleyjohanna/seriously-though-what-is-a-progressive-web-app-56130600a093):

* [src/assets/icons/icons-192.png](src/assets/icons/icons-192.png): This is a 192x192 pixel version of your game's icon.
* [src/assets/icons/icons-512.png](src/assets/icons/icons-512.png): This is a 512x512 pixel version of your game's icon.
* [src/assets/icons/favicon.ico](src/assets/icons/favicon.ico): The [Favicon](https://en.wikipedia.org/wiki/Favicon) for your game.
