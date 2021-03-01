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
})

