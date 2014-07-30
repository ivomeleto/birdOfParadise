// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// Pseudo-classes

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// creep image
var creepReady = false;
var creepImage = new Image();
creepImage.onload = function () {
    creepReady = true;
};
creepImage.src = "../img/Soviet-tank/soviet_tank_body_pos1.png";

// Game objects
var hero = {
    speed: 256 // movement speed
};

function creep(speed,x,y){
    this.speed = 200;
    this.x = x;
    this.y = y;
}

var i;
var creepCount = 8; // number of creeps

var creeps = [];  

for (i = 0; i < creepCount; i++){
    creeps[i] = new creep();
}
var creepsHit = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
});

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
});

// Reset the game when the player catches a creep
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height - canvas.height/6;

    // Throw the creep somewhere on the screen randomly

    for (i = 0; i < creepCount; i++) {
        creeps[i].x = 32 + (Math.random() * (canvas.width - 164));
        creeps[i].y = 32 + (Math.random() * (canvas.height - 164)); 
        if(i > creepCount/2){
             creeps[i].x = 32 + (Math.random() * (canvas.width - 164));
             creeps[i].y = 32 + (Math.random() * (canvas.height - 164)); 
        }       
    }
};

// Update game objects
var update = function (modifier) {

    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
 
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
 
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
 
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
 
    }

    for (var i = 0; i < creepCount; i++) {
        
        if (i > creepCount/2){
            creeps[i].x -= creeps[i].speed * modifier;
        }else{
            creeps[i].x += creeps[i].speed * modifier;
        }  

        if (
		    hero.x <= (creeps[i].x + 32)
		    && creeps[i].x <= (hero.x + 32)
		    && hero.y <= (creeps[i].y + 32)
		    && creeps[i].y <= (hero.y + 32)
        ) {
            
            ++creepsHit;
            // reset();
            
        }
        if (creeps[i].x > canvas.width-110 || creeps[i].x < 0) {
            if (i > creepCount / 2){
                creeps[i].x = canvas.width - 110; 
            }else{
                creeps[i].x = 32;
            }
            creeps[i].y = 32 + (Math.random() * (canvas.height - 164));
        }
        if (hero.x > canvas.width - 110) {
            hero.x = canvas.width - 110;
        }
        if (hero.x < 40) {
            hero.x = 40;
        }
        if (hero.y > canvas.height - 50) {
            hero.y = canvas.height - 50;
        }

    }
    // Are they touching?
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
            ctx.drawImage(heroImage, hero.x, hero.y);
    }
    for (i = 0; i < creepCount; i++) {
        if (creepReady) {
            ctx.drawImage(creepImage, creeps[i].x, creeps[i].y);
        }
    }

    //ctx.rotate(2);
    //ctx.drawImage(hero, hero.x, hero.y);


    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText("Farts caught: " + creepsHit, 32, 32);
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Start the game
var then = Date.now();
reset();
main();
console.log();
console.log();
console.log();