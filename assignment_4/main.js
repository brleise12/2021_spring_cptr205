window.addEventListener('DOMContentLoaded', DOMContentLoaded => {

    //Websocket
    const ws = new WebSocket('wss://southwestern.media/game_dev');
    ws.addEventListener('open', open => {
        console.log('WEBSOCKET CONNECTION OPENED');
        document.addEventListener('click', click => {
            click.client
        });
        const data = {};
        data.Game = 'Brett_assignment_3';
        const our_name = data.Name = Math.random().toString();
        const our_message = {};
        our_message.Text = 'Hello';
        our_message.Arbitrary = 'odellillay';
        data.Message = JSON.stringify(our_message);
        ws.send(JSON.stringify(data));
    });
    ws.addEventListener('close', close => {
        console.log('WEBSOCKETS CLOSED');
    })
//actual stuff hi
    const game = document.querySelector('canvas').getContext('2d'); 
    game.canvas.width = game.canvas.clientWidth; 
    game.canvas.height = game.canvas.clientHeight; 
    
    let last_x = 0; 
    let last_y = 0; 
    document.addEventListener('click', click => {
        console.log(click.clientX); 
        console.log(click.clientY); 
        
        game.beginPath(); 
        game.moveTo(last_x, last_y); 
        game.lineTo(click.clientX, click.clientY); 
        game.stroke(); 
        last_x = click.clientX; 
        last_y = click.clientY; 

        game.fillRect(click.clientX, click.clientY, 20, 20); 
    }); 

})

