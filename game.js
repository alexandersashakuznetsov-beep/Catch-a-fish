const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

// 🐱 CAT
let cat = {
    x: 180,
    y: 520,
    width: 40,
    height: 40,
    speed: 6,
    dy: 0,
    gravity: 0.5,
    jumpPower: -10,
    grounded: true
};

// 🐟 FISH
let fish = {
    x: Math.random() * 360,
    y: 0,
    width: 30,
    height: 30,
    speed: 3
};

let score = 0;

// 🎮 CONTROLS
let left = false;
let right = false;

// Keyboard
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") left = true;
    if (e.key === "ArrowRight") right = true;

    // Jump
    if (e.key === " " && cat.grounded) {
        cat.dy = cat.jumpPower;
        cat.grounded = false;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") left = false;
    if (e.key === "ArrowRight") right = false;
});

// 📱 TOUCH (iPad)
canvas.addEventListener("touchstart", (e) => {
    let touchX = e.touches[0].clientX;

    if (touchX < canvas.width / 2) left = true;
    else right = true;

    // Jump on tap
    if (cat.grounded) {
        cat.dy = cat.jumpPower;
        cat.grounded = false;
    }
});

canvas.addEventListener("touchend", () => {
    left = false;
    right = false;
});

// 🔄 GAME UPDATE
function update() {
    // Move left/right
    if (left && cat.x > 0) cat.x -= cat.speed;
    if (right && cat.x < canvas.width - cat.width) cat.x += cat.speed;

    // Gravity
    cat.dy += cat.gravity;
    cat.y += cat.dy;

    // Ground
    if (cat.y >= 520) {
        cat.y = 520;
        cat.dy = 0;
        cat.grounded = true;
    }

    // Fish falls
    fish.y += fish.speed;

    // Catch fish
    if (
        fish.x < cat.x + cat.width &&
        fish.x + fish.width > cat.x &&
        fish.y < cat.y + cat.height &&
        fish.y + fish.height > cat.y
    ) {
        score++;
        resetFish();
    }

    // Missed fish
    if (fish.y > canvas.height) {
        resetFish();
    }
}

// 🔁 RESET FISH
function resetFish() {
    fish.x = Math.random() * 360;
    fish.y = 0;
}

// 🎨 DRAW
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "30px Arial";

    // Cat
    ctx.fillText("🐱", cat.x, cat.y);

    // Fish
    ctx.fillText("🐟", fish.x, fish.y);

    // Score
    ctx.fillText("Score: " + score, 10, 30);
}

// 🔁 LOOP
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
