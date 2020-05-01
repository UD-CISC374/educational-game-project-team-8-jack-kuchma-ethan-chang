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
                console.log()
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })
        this.on('drop', (pointer, dropZoneOutline) => {
            console.log('dropped in zone');
            dropZoneOutline.data.values.cards++;
            this.x = (dropZoneOutline.x - 300) + (dropZoneOutline.data.values.cards * 60);
            this.y = dropZoneOutline.y;
            this.disableInteractive();
        })
        scene.add.existing(this);

        this.attack = scene.add.text(this.x, this.y, "moles: " + String(moles), {font: "10px Arial", fill: "black"});
    }
}
