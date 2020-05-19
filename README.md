# Title: NaCl The Base is Under Assault

# Elevator Pitch
This is a turn-based card game. The player plays against a bot and attempts to defeat the enemy by attacking it with chemistry cards they place down on the board. These cards are either an acid or base. The cards contain stats of moles and volume. Right clicking your card on the board heals you for it's molarity value. Moles is the card's health as well as the damage done to other cards. Take the enemy's health to 0 before they do to yours.

# Basic Instructions
Go through the instructions; click on each instruction box to read the next instruction.
Drag cards onto the board. Then left click it and an enemy card of opposite type to attack it. If your card has excess moles, damage is done to the enemy castle based on how many moles are left over.
Once per turn, you can right click your card on the board to heal your castle by a certain amount, namely the molarity of the card.
Note: molarity = moles / volume
Take the enemy's health to 0 and you win. If your health goes to 0, you lose.
# educational-phaser-game-template

Template for designing educational Phaser Games

# Important Files

These files are for coding your game:

* [src/scripts/game.ts](src/scripts/game.ts): The starting file of your game.

These files are for documenting your game:
 
* [egdd.md](egdd.md): The educational game design document describing this game in more depth.

These [package.json](package.json) settings are for configuring the metadata of your game and should be updated:

* `name`: This must be a lower-case version of your repository name on GitHub, without spaces.
* `description`: Give a quick, one sentence summary of your game.
* `game`:
    * `url`: Change this to be the EXACT name of your repository on GitHub.
    * `shortName`: Choose a short name for your game for [Progressive Web App](https://medium.com/@amberleyjohanna/seriously-though-what-is-a-progressive-web-app-56130600a093) packaging.
    * `name`: Choose a longer, complete name for your game.
* `repository`:
    * `url`: Change this URL to be a link to your GitHub repository.
* `homepage`: Change this URL to be a link to the final version of your game's EGDD.
* `contributors`: This should be an array (list) of strings, where each string is like `"Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"`.

You should edit the following images to create icons for your game, if it gets installed as a [Progressive Web App](https://medium.com/@amberleyjohanna/seriously-though-what-is-a-progressive-web-app-56130600a093):

* [src/assets/icons/icons-192.png](src/assets/icons/icons-192.png): This is a 192x192 pixel version of your game's icon.
* [src/assets/icons/icons-512.png](src/assets/icons/icons-512.png): This is a 512x512 pixel version of your game's icon.
* [src/assets/icons/favicon.ico](src/assets/icons/favicon.ico): The [Favicon](https://en.wikipedia.org/wiki/Favicon) for your game.
