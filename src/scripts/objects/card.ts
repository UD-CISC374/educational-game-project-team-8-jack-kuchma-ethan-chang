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
        //var container = scene.add.container(this.x, this.y, [image, M]).setSize(25, 25);
        /*this.card_back_image = scene.add.image(x,y,card);
        this.add(this.card_back_image);

        this.attack = scene.add.text(x,y,"0");
        this.add(this.attack);*/

    }
}
