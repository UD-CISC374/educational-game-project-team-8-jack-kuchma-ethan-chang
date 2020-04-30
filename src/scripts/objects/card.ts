export default class Card extends Phaser.Physics.Arcade.Image {
    card_back_image: Phaser.GameObjects.Image;
    attack: Phaser.GameObjects.Text;
    molarity: number = 1;
    mole: number = 2;

    constructor(scene: Phaser.Scene, x: number, y: number, card: string) {
        /* I imagine some type of hash table like thing where the key('acid','base','spell') is passed 
        to this card object.
        */
        super(scene, x, y, card);
        scene.add.existing(this);

        this.attack = scene.add.text(this.x, this.y, "moles: " + String(this.molarity), {font: "10px Arial", fill: "black"});

    }
}
