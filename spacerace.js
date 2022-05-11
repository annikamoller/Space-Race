let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const player_x_value = 500
let player_y_value = 450
let player_radius = 22
let obstacle_radius = 5
let is_moving = false
let points = 0
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
        let delta_y = Math.abs(this.y - player_y_value)
        let delta_x = Math.abs(this.x - player_x_value)


        if (Math.sqrt(delta_y ** 2 + delta_x ** 2) < Math.abs(player_radius - obstacle_radius)) {
            return true
        }
        else {
            return false
        }
    }
}

function generateObstacles(){
    obstacles = []
    for (let i = 0; i<20; i++){
        obstacles.push(new Obstacle(i*20))
    }
}

function update() {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, 1000, 500);

    ctx.fillStyle = 'rgb(255,192,203)';
    ctx.font = "30px Arial";
    ctx.fillText("Points: " + points, 10, 420);
    ctx.fillText("Highscore: " + highscore, 10, 470);

    ctx.fillStyle = 'rgb(255,192,203)';
    ctx.drawImage(spaceshipImg, player_x_value-25, player_y_value-25, 50, 50);

    // Old draw circle / hitbox
    // ctx.beginPath();
    // ctx.arc(player_x_value, player_y_value, player_radius, 0, 2 * Math.PI);
    // ctx.fill();

    if (is_moving == true) {
        player_y_value --
    }
    if (is_moving == false && player_y_value < 450) {
        player_y_value ++
    }

    obstacles.forEach(obs => {
        obs.update()

        if (obs.is_colliding() == true){
            player_y_value = 450
            points = 0
            clearInterval(interval)
            interval = setInterval(update, 30-points*5)
        }
    })   

    if (player_y_value == 0) {
        points ++
        player_y_value = 450
        generateObstacles()
        clearInterval(interval)
        interval = setInterval(update, 30-points*5)
        if (points > highscore) {
            highscore = points
            localStorage.setItem("highscore", highscore.toString())
        }
    }
}

generateObstacles()
let interval = setInterval(update, 30)

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {
        is_moving = true
    }
});

document.addEventListener("keyup", function (event) {
    if (event.keyCode == 32) {
        is_moving = false
    }
});