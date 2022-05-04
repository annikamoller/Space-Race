let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let player_x_value = 500
let player_y_value = 400
let obstacle_x_value = -30
let obstacle_y_value = 300
let player_radius = 30
let obstacle_radius = 5
let is_moving = false

class Obstacle {
    constructor(y) {
        this.y = y;
        this.x = -30;
    }

    update() {
        ctx.fillStyle = 'rgb(255,192,203)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, obstacle_radius, 0, 2 * Math.PI);
        ctx.fill();

        this.x += 4

        if (this.x >= 1030) {
            this.x = -30
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

let obstacles = []

for (let i = 0; i<10; i++){
    obstacles.push(new Obstacle(i*12))
}

function update() {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, 1000, 500);

    ctx.fillStyle = 'rgb(255,192,203)';
    ctx.beginPath();
    ctx.arc(player_x_value, player_y_value, player_radius, 0, 2 * Math.PI);
    ctx.fill();

    if (is_moving == true) {
        player_y_value -= 1
    }

    obstacles.forEach(obs => {
        obs.update()

        if (obs.is_colliding() == true){
            player_y_value = 400
        }
    })   
}

setInterval(update, 30)

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