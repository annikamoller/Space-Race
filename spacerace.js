var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var y_value = 400
var is_moving = false

function update(){
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, 1000, 500);
    
    ctx.fillStyle = 'rgb(255,192,203)';
    ctx.beginPath();
    ctx.arc(500, y_value, 30, 0, 2 * Math.PI);
    ctx.fill();

    if (is_moving == true) {
        y_value -= 1
    }
}

setInterval(update, 50)

document.addEventListener("keydown", function(event) {
    if (event.keyCode == 32) {
        is_moving = true
    }
  });

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 32) {
        is_moving = false
    }
  });


