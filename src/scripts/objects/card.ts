export default class ExampleObject extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x: number, y: number, card: string) {
        /* I imagine some type of hash table like thing where the key('acid','base','spell') is passed 
        to this card object.
        */
        super(scene, x, y, card);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on('drag', (pointer: any, gameObject: this, dragX: number, dragY: number) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        scene.add.existing(this);

    }
}
