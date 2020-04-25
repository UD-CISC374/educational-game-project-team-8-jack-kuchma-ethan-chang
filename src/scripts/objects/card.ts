export default class Card extends Phaser.GameObjects.Image {
    card_back_image: Phaser.GameObjects.Image;
    attack: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, card: string) {
        /* I imagine some type of hash table like thing where the key('acid','base','spell') is passed 
        to this card object.
        */
        super(scene, x, y, card);
        scene.add.existing(this);

        /*this.card_back_image = scene.add.image(x,y,card);
        this.add(this.card_back_image);

        this.attack = scene.add.text(x,y,"0");
        this.add(this.attack);*/

    }
}
