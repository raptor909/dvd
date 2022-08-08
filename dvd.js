export class DVD {
    constructor(url, ctx) {
        this.outline = false;
        this.cornerCollisions = 0;
        this.wallCollisions = 0;
        this.canvas = ctx.canvas;
        this.ctx = ctx;
        this.x = this.canvas.width/2;
        this.y = this.canvas.height/2;
        this.velocity = {
            x: 1,
            y: 1
        }
        this.url = url;
        this.img = new Image();
        this.img.src = url;
        this.img.onload = () => {
            this.aspRatio = this.img.width / this.img.height;
            this.img.width = this.canvas.width/10;
            this.img.height = this.img.width / this.aspRatio;
            this.width = this.img.width;
            this.height = this.img.height;
            console.log(`aspRatio: ${this.aspRatio}\nwidth: ${this.width}\nheight: ${this.height}`);
        }
    }
    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (!this.outline) return
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x+this.width, this.y);
        this.ctx.lineTo(this.x+this.width, this.y+this.height);
        this.ctx.lineTo(this.x, this.y+this.height);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
    }
    update() {
        this.lastFrameCollision = this.collision;
        this.collisionsPerFrame = 0;
        if (this.x+this.width > this.canvas.width) {
            this.x = this.canvas.width-this.width;
            this.velocity.x *= -1;
            this.collisionsPerFrame++;
        }
        if (this.y+this.height > this.canvas.height) {
            this.y = this.canvas.height-this.height;
            this.velocity.y *= -1;
            this.collisionsPerFrame++;
        }
        if (this.x < 0) {
            this.x = 0;
            this.velocity.x *= -1;
            this.collisionsPerFrame++;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocity.y *= -1;
            this.collisionsPerFrame++;
        }
        if (this.collisionsPerFrame > 1 || this.lastFrameCollision > 0) {
            console.log('corner collision');
            this.cornerCollisions++;
        }
        else if (this.collisionsPerFrame === 1) {
            console.log('wall collision');
            this.wallCollisions++;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}