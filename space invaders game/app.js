const scoreEl = document.querySelector("#scoreEl");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let score = 0;




class Player {

    constructor() {


        this.rotate = 0;

        this.velocity = {
            x: 0,
            y: 0
        }

        this.opacity = 1;

        const image = new Image();
        image.src = "./img/spaceship.png";
        image.onload = () => {
            const scale = 0.15;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }

    }
    // ... rest of your Player class ...

    draw() {
        console.log("ok");
        c.save();
        c.globalAlpha = this.opacity;

        c.translate(this.position.x + this.width / 2,
            this.position.y + this.height / 2)

        c.rotate(this.rotate);

        c.translate(-this.position.x - this.width / 2,
            -this.position.y - this.height / 2)

        c.drawImage(this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
        c.restore();
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }




}






class Projectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;

        this.radius = 3;

    }
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "red";
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

    }
}
class InvaderProjectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;



        this.width = 3;
        this.height = 10

        this.radius = 3;

    }
    draw() {
        c.fillStyle = "white";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

    }
}

class Particle {
    constructor({ position, velocity, radius, color, fades }) {
        this.position = position;
        this.velocity = velocity;

        this.radius = radius;
        this.color = color;
        this.opacity = 1

        this.fades = fades
    }
    draw() {
        c.save()
        c.globalAlpha = this.opacity;
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.fades) {
            this.opacity -= 0.01;
        }

    }
}

class Invader {
    constructor({ position }) {



        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image();
        image.src = "./img/invader.png";
        image.onload = () => {
            const scale = 1;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = position;
        }




    }


    shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
            },
            velocity: {
                x: 0,
                y: 5,
            }
        }))
    }

    draw() {
        // c.fillStyle = "red"
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.drawImage(this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height);





    }

    update({ velocity }) {
        if (this.image) {

            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }
}

class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }

        this.invaders = []

        let rows = Math.floor(Math.random() * 5 + 2);
        let coloumns = Math.floor(Math.random() * 10 + 5);

        this.width = coloumns * 30;
        for (let x = 0; x < coloumns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({
                    position: {
                        x: x * 30,
                        y: y * 30
                    }
                }))

            }
        }



    }




    update() {

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.y = 0;

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y = 30;
        }
    }
}

const player = new Player();
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];
let game = {
    over: false,
    active: true,
}



for (let i = 0; i < 100; i++) {
    particles.push(new Particle({
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
        },
        velocity: {
            x: 0,
            y: 0.4,
        },

        radius: Math.random() * 3,
        color: "white",
        fades: false,



    }))
}



const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    }
}

function createParticles({ object, color }) {
    for (let i = 0; i < 15; i++) {
        particles.push(new Particle({
            position: {
                x: object.position.x + (object.width / 2),
                y: object.position.y + (object.height / 2),
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
            },

            radius: Math.random() * 3,
            color: color || "#BAA0DE",
            fades: true,



        }))
    }
}

let frames = 0;
let randomInterval = Math.floor(Math.random() * 500) + 500;

function animate() {
    if (!game.active) return;
    requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);


    particles.forEach((particle, i) => {

        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width;
            particle.position.y = -particle.radius;
        }


        if (particle.opacity <= 0) {
            setTimeout(() => {
                particles.splice(i, 1);

            }, 0)
        } else {
            particle.update();

        }
    })

    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1);

            }, 0);
        } else {
            invaderProjectile.update();

        }

        if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y &&
            invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width

        ) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1);
                player.opacity = 0;
                game.over = true;
            }, 0);

            setTimeout(() => {
                game.active = false;
            }, 2000);
            createParticles({
                object: player,
                color: "white"
            })
        }


    })

    console.log("keys.a.pressed:", keys.a.pressed);  // Check if 'a' key flag is set correctly
    console.log("keys.d.pressed:", keys.d.pressed);  // Check if 'd' key flag is set correctly

    if (keys.a.pressed && player.position.x >= 0) {
        console.log("Moving left");
        player.velocity.x = -7
        player.rotate = -0.15;
    } else if (keys.d.pressed && player.position.x <= canvas.width - player.width) {
        console.log("Moving right");
        player.velocity.x = 7;
        player.rotate = 0.15;
    } else {
        player.velocity.x = 0;
        player.rotate = 0;
    }

    player.update();

    projectiles.forEach((projectile, inedx) => {

        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(inedx, 1);

            }, 0);
        } else {
            projectile.update()

        }
    })



    grids.forEach((grid, gridIndex) => {
        grid.update();
        // spawn invaderProjectiles
        if (frames % 100 == 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles);

        }
        grid.invaders.forEach((invader, i) => {
            invader.update({ velocity: grid.velocity });




            projectiles.forEach((projectile, j) => {

                if (projectile.position.y + projectile.radius <= invader.position.y + invader.height
                    &&
                    projectile.position.x - projectile.radius >= invader.position.x
                    &&
                    projectile.position.x + projectile.radius < invader.position.x + invader.width
                ) {
                    setTimeout(() => {
                        const invaderFound = grid.invaders.find(invader2 => {
                            return invader2 === invader;
                        });
                        const projectileFound = projectiles.find(projectile2 => projectile2 === projectile);

                        // removing invader and projectile
                        if (invaderFound && projectileFound) {
                            score += 100;
                            scoreEl.innerHTML = score;
                            grid.invaders.splice(i, 1);
                            projectiles.splice(j, 1);
                            createParticles({
                                object: invader

                            });

                            if (grid.invaders.length > 0) {
                                let firstInvader = grid.invaders[0];

                                let lastInvader = grid.invaders[grid.invaders.length - 1];

                                grid.width = lastInvader.position.x + lastInvader.width - firstInvader.position.x;
                                grid.position.x = firstInvader.position.x;

                            } else {
                                grids.splice(gridIndex, 1);
                            }

                        }

                    }, 0);
                }
            })

        })
    })


    // respawning new grids
    if (frames % randomInterval === 0) {
        grids.push(new Grid());
        randomInterval = Math.floor(Math.random() * 500) + 500;
        frames = 0;
    }



    frames++;

}


animate();



addEventListener("keydown", (event) => {
    console.log(`Key pressed: ${event.code}`);
    if (game.over) return;
    switch (event.code) {
        case "KeyA":
            console.log("KeyA pressed");  // Debug log
            keys.a.pressed = true;
            break;
        case "KeyD":
            console.log("KeyD pressed");  // Debug log
            keys.d.pressed = true;
            break;
        case "Space":
            console.log("Space pressed"); // Debug log
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }));
            break;
    }
});

addEventListener("keyup", (event) => {
    console.log(`Key released: ${event.code}`);
    switch (event.code) {
        case "KeyA":
            console.log("KeyA released");  // Debug log
            keys.a.pressed = false;
            break;
        case "KeyD":
            console.log("KeyD released");  // Debug log
            keys.d.pressed = false;
            break;
        case "Space":
            console.log("Space released"); // Debug log
            break;
    }
});