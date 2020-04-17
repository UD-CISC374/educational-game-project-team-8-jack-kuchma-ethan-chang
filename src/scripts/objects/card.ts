export default class ExampleObject extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        /* I imagine some type of hash table like thing where the key('acid','base','spell') is passed 
        to this card object. Depending on the key, it'll run a super() function who's image changes based on a key.
        if (key == 'acid') {
            super(scene, x, y, 'acid_card');
        } else if (key == 'base') {
            super(scene, x, y, 'base_card');
        } else if (key == 'water') {
            super(scene, x, y, 'water_card');
        }
        */
        super(scene, x, y, 'card');
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on('drag', (pointer: any, gameObject: this, dragX: number, dragY: number) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        scene.add.existing(this);

    }
}
