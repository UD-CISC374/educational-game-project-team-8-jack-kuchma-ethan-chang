export default class Zone extends Phaser.GameObjects.Zone {
    constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
        super(scene, x, y, w, h);
        this.setData({ cards: 0 });
        //this.setInteractive();
        scene.add.existing(this);

        this.setRectangleDropZone(w,h);
        let dropZoneOutline = scene.add.graphics();
        dropZoneOutline.lineStyle(4, 0xff69b4);
        dropZoneOutline.strokeRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}