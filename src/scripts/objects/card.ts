export default class Card extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x: number, y: number, card: string) {
        /* I imagine some type of hash table like thing where the key('acid','base','spell') is passed 
        to this card object.
        */
        super(scene, x, y, card);
        scene.add.existing(this);

    }
}
