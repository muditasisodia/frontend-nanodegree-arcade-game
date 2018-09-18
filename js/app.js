// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed*dt;
   if (this.x > 500) {
     this.x = 0;
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
 this.sprite = 'images/char-boy.png';
 this.x = 200;
 this.y = 350;
};
Player.prototype.update = function(dt) {
  // Collision logic
  for (let enemy of allEnemies) {
    let dx = this.x - enemy.x - 15;
    let dy = this.y - enemy.y - 20;
    //Since the hypotenuse is the actual distance between them
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 56) {
      this.y = 350;
    }
  }
  // Win logic
  if (this.y < 10) {
    this.y = 410;
  }
};
Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {
 if(dir === "up" && this.y>25){
   this.y -= 50;
 }
 else if(dir === "down" && this.y<400){
   this.y += 50;
 }
 else if(dir === "left" && this.x>25){
   this.x -= 50;
 }
 else if(dir === "right" && this.x<400){
   this.x += 50;
 }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//In enemyStartPos, in each element, the first index is the y-index of the enemy and the second index is the speed parameter of the enemy
var enemyStartPos = [[65, 95], [145, 72], [230,63]];
var allEnemies = enemyStartPos.map(y => new Enemy(0, y[0], y[1]));
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
