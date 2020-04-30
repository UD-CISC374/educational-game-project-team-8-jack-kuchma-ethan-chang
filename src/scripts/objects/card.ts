export default class Card extends Phaser.Physics.Arcade.Image {
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
        scene.input.on('dragend', function(pointer, gameObject) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })
        scene.add.existing(this);

        this.attack = scene.add.text(this.x, this.y, "moles: " + String(moles), {font: "10px Arial", fill: "black"});
        //var container = scene.add.container(this.x, this.y, [image, M]).setSize(25, 25);
        /*this.card_back_image = scene.add.image(x,y,card);
        this.add(this.card_back_image);

        this.attack = scene.add.text(x,y,"0");
        this.add(this.attack);*/

    }
}
