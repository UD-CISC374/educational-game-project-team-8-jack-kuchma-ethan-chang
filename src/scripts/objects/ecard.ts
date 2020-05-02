export default class Card extends Phaser.Physics.Arcade.Image {
    card_back_image: Phaser.GameObjects.Image;
    attack: Phaser.GameObjects.Text;
    moles: number;
    cardType: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, card: string, moles: number) {
        /* I imagine some type of hash table like thing where the key('acid','base','spell') is passed 
        to this card object.
        */
        super(scene, x, y, card);
        scene.add.existing(this);

        x = Math.random();
        if (x > 0.5) {
            this.cardType = scene.add.text(this.x, this.y, 'Acid', {font: "10px Arial", fill: "black"});
        } else {
            this.cardType = scene.add.text(this.x, this.y, 'Base', {font: "10px Arial", fill: "black"});
        }
        this.attack = scene.add.text(this.x, this.y, "moles: " + String(moles), {font: "10px Arial", fill: "black"});
    }
}