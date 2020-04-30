export default class ECard extends Phaser.Physics.Arcade.Image {
    card_back_image: Phaser.GameObjects.Image;
    attack: Phaser.GameObjects.Text;
    moles: number;

    constructor(scene: Phaser.Scene, x: number, y: number, card: string, moles: number) {
        /* I imagine some type of hash table like thing where the key('acid','base','spell') is passed 
        to this card object.
        */
        super(scene, x, y, card);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.setTint(0xff69b4);
            //scene.children.bringToTop(gameObject);
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        scene.input.on('dragend', function(pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })
        scene.input.on('drop', function(pointer, gameObject, target) {
            console.log('dropped in zone');
            target.data.values.cards++;
            gameObject.x = (target.x - 300) + (target.data.values.cards * 60);
            gameObject.y = target.y;
            gameObject.disableInteractive();
        })
        scene.add.existing(this);

        this.attack = scene.add.text(this.x, this.y, "moles: " + String(moles), {font: "10px Arial", fill: "black"});
    }
}
