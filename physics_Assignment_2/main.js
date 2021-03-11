window.addEventListener('DOMContentLoaded', DOMContentloaded => {
    
    //Canvas init
    const render = document.querySelector('canvas').getContext('2d');
    let w,h, unit; 
    const resize = () => {
        w = render.canvas.width = render.canvas.clientWidth * window.devicePixelRatio;
        h = render.canvas.height = render.canvas.clientHeight * window.devicePixelRatio;
        unit = h/2;
    };
    resize();
    window.addEventListener('resize',resize);

    //applied physics, move those physics, position them
    let player_x = 0, player_y = 0;
    let player_rad = 0.2; 
    let velocity_x = 0, velocity_y = 0;
    let player_ax = 0, player_ay = 0;
    let arrow_Right = false;
    let arrow_Left = false;
    document.addEventListener('keydown', keydown => {
        if(keydown.key ==='ArrowRight') {
            arrow_Right = true;
        }
        if(keydown.key === 'ArrowLeft') {
            arrow_Left = true;
        }
        if(keydown.key === 'ArrowUp') {
            player_ay += 0.01;
        }
    });
    document.addEventListener('keyup', keyup => {
        if(keyup.key === 'ArrowRight') {
            arrow_Right = false;
        }
        if(keyup.key === 'ArrowLeft') {
            arrow_Left = false;
        }
    });

    // Platform 
    class Platform {
        constructor(x,y,w,h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
    }
    const plats = []; //starting a list of platforms
    plats.push(new Platform(-1, -0.5, 2, 0.1));
    plats.push(new Platform(-1, .25, 2, 0.1));

    //animation loop where the color gets adjusted as well
    const animation = timestamp => {
        const PLAYER_ACCELERATION_X = 0.001;
        if(arrow_Right) {
            player_ax += PLAYER_ACCELERATION_X;
        }
        if(arrow_Left) {
            player_ax -= PLAYER_ACCELERATION_X;
        }
        velocity_x += player_ax;
        player_x += velocity_x;
        player_ax = 0;
        velocity_x *= 0.98;
        velocity_y += player_ay;
        player_ay -= 0.00098;

        let player_grounded = false
        plats.forEach(platform => {   //&& only checks after if true remember that
            if(platform.x <= player_x && player_x <= platform.x + platform.w && platform.y <= player_y && player_y + velocity_y <= platform.y) { 
                player_grounded = true
                player_ay = 0;
                velocity_y = 0;
                player_y = platform.y;
                return;
            } 
        });
        if(!player_grounded) {
            player_y += velocity_y;
        }
        
        render.save();
        render.translate(-player_x * unit, player_y * unit);

        render.clearRect(player_x * unit, player_y * unit, render.canvas.width, render.canvas.height);

        render.fillStyle = '#0f0';
        render.fillRect(-1000, render.canvas.height / 2, 1000 * render.canvas.width, render.canvas.height / 2);
   
        render.fillStyle = '#00f';
        render.fillRect(-1050 * w, 0, 10000 * render.canvas.width, render.canvas.height / 2);
        
        render.fillStyle = '#f00';
        plats.forEach(platform => {
            render.fillRect(platform.x, -platform.y * unit + h/2, platform.w * w/2, platform.h * unit);
        });


// gravity adjusted for the loop
        render.fillStyle = '#f0f';
        render.beginPath();
        render.arc(player_x * w / 2 + w / 2, -player_y * h / 2 + h / 2 - player_rad * h / 2, player_rad * h / 2, 0, 2 * Math.PI);
        render.fill();

        render.restore();

        window.requestAnimationFrame(animation);
    };
    window.requestAnimationFrame(animation)
});