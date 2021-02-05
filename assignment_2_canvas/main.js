console.log('Hello, world!'); 

let canvas = document.querySelector('canvas'); 

let context = canvas.getContext('2d'); 

context.fillStyle = 'green'; 
context.fillRect(100, 175, 109, 100); 

context.fillStyle = 'blue'; 
context.fillRect(0, 0, 200, 100); 