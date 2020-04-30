export default class Card extends Phaser.Physics.Arcade.Image {
    card_back_image: Phaser.GameObjects.Image;
    attack: Phaser.GameObjects.Text;
    moles;

    constructor(scene: Phaser.Scene, x: number, y: number, card: string, moles: number) {
        /* I imagine some type of hash table like thing where the key('acid','base','spell') is passed 
        to this card object.
        */
        super(scene, x, y, card);
        scene.add.existing(this);

<<<<<<< HEAD
        this.attack = scene.add.text(this.x, this.y, "moles: " + String(this.molarity), {font: "10px Arial", fill: "black"});
=======
        this.attack = scene.add.text(this.x, this.y, "moles: " + String(moles), {font: "10px Arial", fill: "black"});
        //var container = scene.add.container(this.x, this.y, [image, M]).setSize(25, 25);
        /*this.card_back_image = scene.add.image(x,y,card);
        this.add(this.card_back_image);

        this.attack = scene.add.text(x,y,"0");
        this.add(this.attack);*/
>>>>>>> fe2354f8d37835941ce766eca827c69280321013

    }
}
