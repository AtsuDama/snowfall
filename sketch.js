class Star {
  constructor() {
    this.scale = random(0.5, 2.0);
    this.position = createVector(random(0, width), -20);
    this.velocity = createVector(0, map(this.scale, 0.5, 1.5, 0.2, 0.5));
    this.accelaration = createVector(0, 0);
    this.rotationalPosition = 0;
    this.rotationalVelocity = random(0, 0.05);
    this.col = color(random(1.0), 0.5, 1.0, 0.8);
		this.side = 40;
    this.img = createGraphics(this.side, this.side);
    this.imgSetup();
  }
  update() {
    this.velocity.add(this.accelaration);
    this.position.add(this.velocity);
    this.accelaration.set(0, 0);
    this.rotationalPosition += this.rotationalVelocity;
  }
  imgSetup() {
    for (let i = 0; i < 6; i++) {
      this.img.push();
      this.img.translate(this.side / 2, this.side / 2);
      this.img.rotate(i * TWO_PI / 6);
      this.img.scale(this.scale);
      this.img.noFill();
      this.img.stroke(this.col);
      this.img.strokeWeight(1);
      this.img.beginShape(QUADS);
      this.img.vertex(0, 0);
      this.img.vertex(2, 3);
      this.img.vertex(0, 10);
      this.img.vertex(-2, 3);
      this.img.endShape();
      this.img.pop();
    }
  }
  display() {
    push();
    imageMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(this.rotationalPosition);
    image(this.img, 0, 0);
    pop();
  }
}

class Snowflake_01 extends Star {
	constructor() {
		super();
	}
  imgSetup() {
    for (let i = 0; i < 6; i++) {
      this.img.push();
      this.img.translate(this.side / 2, this.side / 2);
      this.img.rotate(i * TWO_PI / 6);
      this.img.scale(this.scale);
      this.img.noFill();
      this.img.stroke(this.col);
      this.img.strokeWeight(1);
      this.img.beginShape(LINES);
      this.img.vertex(0, 0);
      this.img.vertex(0, 10);
      this.img.vertex(0, 4);
      this.img.vertex(2, 6);
      this.img.vertex(0, 4);
      this.img.vertex(-2, 6);
      this.img.vertex(0, 7);
      this.img.vertex(2, 9);
      this.img.vertex(0, 7);
      this.img.vertex(-2, 9);
      this.img.endShape();
      this.img.pop();
    }
  }
}

class Snowflake_02 extends Star {
	constructor() {
		super();
	}
  imgSetup() {
    for (let i = 0; i < 12; i++) {
      this.img.push();
      this.img.translate(this.side / 2, this.side / 2);
      this.img.rotate(i * TWO_PI / 12);
      this.img.scale(this.scale);
      this.img.noFill();
      this.img.stroke(this.col);
      this.img.strokeWeight(1);
      this.img.beginShape(LINES);
			if (i % 2 == 0) {
      	this.img.vertex(0, 0);
      	this.img.vertex(0, 10);
      	this.img.vertex(0, 5);
      	this.img.vertex(2, 7);
      	this.img.vertex(0, 5);
      	this.img.vertex(-2, 7);
      	this.img.vertex(0, 7);
      	this.img.vertex(2, 9);
      	this.img.vertex(0, 7);
      	this.img.vertex(-2, 9);
			} else {
				this.img.vertex(0, 0);
				this.img.vertex(0.75, 4);
				this.img.vertex(0, 0);
				this.img.vertex(-0.75, 4);
			}
      this.img.endShape();
      this.img.pop();
    }
  }
}

let objs = [];
let interval = 10;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  colorMode(HSB, 1.0);
  blendMode(BLEND);
  background(0);
}

function draw() {
  clear();
  background(0);
  if (frameCount % interval == 0) {
		let p = random(1)
    if (p < 0.33) {
      objs.push(new Star());
    } else if (p >= 0.33 && p < 0.66 ) {
      objs.push(new Snowflake_01());
    } else {
			objs.push(new Snowflake_02());
		}
  }
  for (let i = 0; i < objs.length; i++) {
    objs[i].update();
    objs[i].display();
  }
  for (let i = 0; i < objs.length; i++) {
    if (objs[i].position.y > height + 10) {
      objs.splice(i, 1);
    }
  }
}

function keyTyped() {
  if (key === 'r') {
    objs = [];
  } else if (key === '1') {
		interval = 60;
	} else if (key === '2') {
		interval = 30;
	} else if (key === '3') {
		interval = 15;
	} else if (key === '4') {
		interval = 10;
	} else if (key === '5') {
		interval = 5;
	}
}
