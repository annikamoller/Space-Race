// Connecting canvas to draw on
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Declaring constants
const player_x_position = 500
const player_radius = 22
const obstacle_radius = 5
const space_button_keycode = 32

let player_y_position = 450
let is_boosting = false
let points = 0

// Retrievs highscore from browser storage if present otherwise 0
let highscore = parseInt(localStorage.getItem("highscore")) || 0

let obstacles = []

const spaceshipImg = new Image()
spaceshipImg.src = "./spaceship.svg"

class Obstacle {
    constructor(y) {
        this.y = y;
        this.x = Math.floor(Math.random()*1100);
        
        if (Math.random() < 0.5) {
            this.direction = -1
        }
        else {
            this.direction = 1
        }
    }

    update() {
        ctx.fillStyle = 'rgb(255,192,203)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, obstacle_radius, 0, 2 * Math.PI);
        ctx.fill();
        
        this.x += (1.5 * this.direction)

        if (this.x >= 1030) {
            this.x = -30
        }

        else if (this.x <= -30) {
            this.x = 1030
        }
    }

    is_colliding() {
        let delta_y = Math.abs(this.y - player_y_position)
        let delta_x = Math.abs(this.x - player_x_position)


        if (Math.sqrt(delta_y ** 2 + delta_x ** 2) < Math.abs(player_radius - obstacle_radius)) {
            return true
        }
        else {
            return false
        }
    }
}

// fill array of obstacles with a spacing of 20 px between them
function generateObstacles(){
    obstacles = []
    for (let i = 0; i<20; i++){
        obstacles.push(new Obstacle(i*20))
    }
}

// Main game loop
function update() {
    // Draw background
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, 1000, 500);

    // Draw score
    ctx.fillStyle = 'rgb(255,192,203)';
    ctx.font = "30px Arial";
    ctx.fillText("Points: " + points, 10, 420);
    ctx.fillText("Highscore: " + highscore, 10, 470);

    // Draw player/spaceship
    ctx.fillStyle = 'rgb(255,192,203)';
    ctx.drawImage(spaceshipImg, player_x_position-25, player_y_position-25, 50, 50);

    if (is_boosting == true) {
        player_y_position --
    }

    // Make player move down again if it stops boosting
    // But dont fall below screen
    if (is_boosting == false && player_y_position < 450) {
        player_y_position ++
    }

    // Run code on every obstacle
    obstacles.forEach(obs => {
        // update object positions
        obs.update()

        if (obs.is_colliding() == true){

            player_y_position = 450
            points = 0
            clearInterval(interval)
            interval = setInterval(update, 30-points*5)
        }
    })   

    // Check if player has won by reaching the top of the screen
    if (player_y_position == 0) {
        points ++
        player_y_position = 450
        generateObstacles()

        // Restarts game loop with shorter intervall between frames 
        // creating the effect of everything speeding up
        clearInterval(interval)
        interval = setInterval(update, 30-points*5)

        if (points > highscore) {
            highscore = points
            localStorage.setItem("highscore", highscore.toString())
        }
    }
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode == space_button_keycode) {
        is_boosting = true
    }
});

document.addEventListener("keyup", function (event) {
    if (event.keyCode == space_button_keycode) {
        is_boosting = false
    }
});


// Starts game by first generating obstacles
// then setting an interval to run the main game loop update() every 30ms
generateObstacles()
let interval = setInterval(update, 30)