const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground =  new Image()
ground.src="img/ground.png";


const foodImg =  new Image()
foodImg.src="img/food.png";

let box = 32;
let score = 0;
let food = {
    x:Math.floor((Math.random() *17+1))*box,
    y:Math.floor((Math.random() *15+4))*box,


};
let shake = [];
shake[0] ={
    x: 9 * box,
    y: 10 * box
};
document.addEventListener("keydown",direction);
let dir;
function direction (event){
    if(event.keyCode === 37 && dir !== "right")
        dir = "left";
    else if(event.keyCode === 38 && dir !== "down")
        dir = "up"
    else if(event.keyCode === 39 && dir !== "left")
        dir = "right"
    else if(event.keyCode === 40 && dir !== "up")
        dir = "down"
}
function eatTail(head, arr){
for(let i= 0; i<arr.length; i ++){
    if( head.x === arr[i].x && head.y === arr[i].y)
        clearInterval(game);
}
}

function drawGame(){
    ctx.drawImage(ground,0,0);
    ctx.drawImage(foodImg,food.x, food.y)


    for (let i = 0; i < shake.length; i ++){
        ctx.fillStyle =  i === 0 ? "green" : "red";
        ctx.fillRect(shake[i].x, shake[i].y, box, box);
    }
    ctx.fillStyle = "white"
    ctx.font = "30px Arial"
    ctx.fillText(score, box * 2.5, box*1.7);
let shakeX = shake[0].x;
let shakeY = shake[0].y;

if (shakeX === food.x && shakeY === food.y){
score++
food = {
    x:Math.floor((Math.random() *17+1))*box,
    y:Math.floor((Math.random() *15+4))*box,
};
}else{
    shake.pop();
}

if(shakeX < box || shakeY > box * 17
|| shakeY <3 * box || shakeY > box *17)
clearInterval(game);



// shake.pop();
if (dir === "left") shakeX -= box;
if (dir === "right") shakeX += box;
if (dir === "up") shakeY -= box;
if (dir === "down") shakeY += box;
let newHead = {
    x:shakeX,
    y:shakeY
    };

    eatTail(newHead, shake)
    shake.unshift(newHead);

}

let game = setInterval(drawGame,100);
