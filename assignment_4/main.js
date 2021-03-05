//line 1 (a,b) -> (c,d), line 2 (p,q) -> (r,s)
function intersects(a,b,c,d,p,q,r,s) {
    let det
    det = (c-a) * (s-q) - (r-p) * (d-b);
    if (det === 0) {
        return false;
    } else {
        return true;
    }
}

window.addEventListener('DOMContentLoaded', DOMContentLoaded => {

    const our_name = Math.random().toString();
    const our_game = 'Brett_assignment_4';
    const lines = []

    //Websocket
    const ws = new WebSocket('wss://southwestern.media/game_dev');
    ws.addEventListener('open', open => {
        console.log('WEBSOCKET CONNECTION OPENED');
        // const data = {};
        // data.Game = 'Brett_assignment_3';
        // const our_name = data.Name = Math.random().toString();
        // const our_message = {};
        // our_message.Text = 'Hello';
        // our_message.Arbitrary = 'odellillay';
        // data.Message = JSON.stringify(our_message);
        // ws.send(JSON.stringify(data));
    });
    ws.addEventListener('close', close => {
        console.log('WEBSOCKETS CLOSED');
    })
    ws.addEventListener('message', msg => {
        const message = JSON.parse(msg.data)
        if(message.Game == our_game){
            let points = JSON.parse(message.Message)
            lines.push(points)
            game.strokeStyle = "#000000"
            game.beginPath(); 
            game.moveTo(points.p1x, points.p1y); 
            game.lineTo(points.p2x, points.p2y); 
            game.stroke();
            game.fillRect(points.p1x-10, points.p1y-10, 20, 20);
            game.fillRect(points.p2x-10, points.p2y-10, 20, 20); 
        }
        // console.log(lines)
    })
//actual stuff
    const game = document.querySelector('canvas').getContext('2d'); 
    game.canvas.width = game.canvas.clientWidth; 
    game.canvas.height = game.canvas.clientHeight; 
    
    let clicked = false;
    let last_x; 
    let last_y; 
    document.addEventListener('click', click => {
        // console.log(click.clientX); 
        // console.log(click.clientY); 

        //if they have clicked then
        if(clicked){
            const data = {};
            data.Game = our_game;
            data.Name = our_name;
            const our_message = {};
            our_message.p1x = last_x;
            our_message.p1y = last_y;
            our_message.p2x = click.clientX;
            our_message.p2y = click.clientY;
            data.Message = JSON.stringify(our_message);
            ws.send(JSON.stringify(data));

            //see if new line intersects with an old line from the points in the array lines

            //iterate through the array of lines and test the new line aganst each old one
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i]
                console.log(line)
                console.log(intersects(last_x,last_y,click.clientX,click.clientY,line.p1x,line.p1y,line.p2x,line.p2y))
            }

            last_x = click.clientX; 
            last_y = click.clientY; 
        } else {
            last_x = click.clientX; 
            last_y = click.clientY; 
            clicked = true;
        } 
    }); 

})

