export default class ECard extends Phaser.Physics.Arcade.Image {
    card_back_image: Phaser.GameObjects.Image;
    attack: Phaser.GameObjects.Text;
    moles: number;
    volume: number;
    heal: Phaser.GameObjects.Text;
    cardType: Phaser.GameObjects.Text;
    value: number; //used in comparing if an acid type card (value = 1) is attacking a base (value = 0)
    onBoard: boolean = true;

    constructor(scene, x: number, y: number, card: string, mol: number, vol: number) {
        /* I imagine some type of hash table like thing where the key('acid','base','spell') is passed 
        to this card object.
        */
        super(scene, x, y, card);
        this.moles = mol;
        this.volume = vol;
        this.setInteractive();
        // scene.eCardGroup.add(this);
        scene.eCardGroup.push(this);
        scene.eCardBoard += 1;
        scene.add.existing(this);

        if (card == 'red_flask') {
            this.cardType = scene.add.text(this.x, this.y, 'Acid', {font: "10px Arial", fill: "black"});
            this.value = 1;
            this.attack = scene.add.text(this.x, this.y, "moles: " + String(this.moles), {font: "10px Arial", fill: "black"});
            this.heal = scene.add.text(this.x, this.y, "volume: " + String(this.volume), {font: "10px Arial", fill: "black"});
        } else {
            this.cardType = scene.add.text(this.x, this.y, 'Base', {font: "10px Arial", fill: "white"});
            this.value = 0;
            this.attack = scene.add.text(this.x, this.y, "moles: " + String(this.moles), {font: "10px Arial", fill: "white"});
            this.heal = scene.add.text(this.x, this.y, "volume: " + String(this.volume), {font: "10px Arial", fill: "white"});
        }
    }
}