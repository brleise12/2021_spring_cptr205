window.addEventListener('DOMContentLoaded', DOMContentloaded => {
    
    //Canvas init
    const render = document.querySelector('canvas').getContext('2d');
    const resize = () => {
        render.canvas.width = render.canvas.clientWidth = window.devicePixelRatio;
        render.canvas.height = render.canvas.clientHeight = window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize',resize);

    //applied physics, move those physics, position them
    let player_x = 0, player_y = 0;
    let player_rad = 0.2; 
    let velocity_x = 0.03, velocity_y = 0;
    let player_ax = 0, player_ay = 0;
    document.addEventListener('keydown', keydown => {
        if(keydown.key ===v'ArrowRight') {
            player_ax += 0.01;
        }
        if(keydown.key === 'ArrowLeft') {
            player_ax -= 0.01;
        }
        if(keydown.key === 'ArrowUp') {
            player_ay += 0.01;
        }
    });

    //animation loop where the color gets adjusted as well
    const animation = timestamp => {
        render.clearRect(0, 0, render.canvas.width, render.canvas.height);

        render.fillStyle = '#0f0';
        render.fillRect(0, render.canvas.height / 2, render.canvas.width, render.canvas.height / 2);

        render.fillStyle = '#00f';
        render.fillRect(0, 0, render.canvas.width, render.canvas.height / 2);

        render.fillStyle = '#f0f';
        render.beginPath();
        const w =render.canvas.width, h = render.canvas.height;
// gravity adjusted for the loop
        velocity_x += player_ax;
        player_x += velocity_x;
        player_ax = 0;
        velocity_x *= 0.98;
        velocity_y += player_ay
        player_y += velocity_y;
        
        if(0 < player_y) {
            player_ay -= 0.000098;
        } else {
            player_ay = 0;
            velocity_y = 0;
            player_y = 0;
        }
        player_ax = 0;
        render.arc(player_x * w / 2 + w / 2, -player_y * h / 2 + h / 2, player_rad * w / 2, 0, 2 * Math.PI);
        render.fill();

        window.requestAnimationFrame(animation);
    };
    window.requestAnimationFrame(animation)
});