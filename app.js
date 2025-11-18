const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let paddle = {
    x: 300,
    y: canvas.height - 20,
    width: 300,
    height: 10,
    speed: 7
}

let ball = {
    x: 350,
    y: 350,
    radius: 8,
    dx: 18,
    dy: -9
}

let bricks = []
function createBriks() {
    bricks = [];
    let rows = 5
    let col = 8
    let width = 60
    let height = 20
    let gap = 8;
    let offsetX = 20
    let offsety = 20

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < col; c++) {
            bricks.push({
                x: offsetX + c * (width + gap),
                y: offsety + r * (height + gap),
                width: width,
                height: height,
                alive: true
            })
        }
    }

}
createBriks()

document.addEventListener("mousemove", (e) => {
    let rect = canvas.getBoundingClientRect();
    paddle.x = e.clientX - rect.left - paddle.width / 2;

    // prevent paddle from going outside
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
});


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // Paddle outline
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // Draw ball
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1
    }

    if (ball.y - ball.radius < 0) {
        ball.dy *= -1
    }

    if (
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width

    ) {
        ball.dy *= -1;
    }

    if (ball.y - ball.radius > canvas.height) {
        ball.x = 300;
        ball.y = 300;
        ball.dy = -19   ;
        createBriks();
    }

    bricks.forEach(brick => {
        if (!brick.alive) return;

        ctx.fillStyle = "teal";
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);

        if (
            ball.x > brick.x &&
            ball.x < brick.x + brick.width &&
            ball.y + ball.radius > brick.y &&
            ball.y - ball.radius < brick.y + brick.height
        ) {
            ball.dy *= -1;
            brick.alive = false;
        }
    });


    requestAnimationFrame(loop)
}


loop()









