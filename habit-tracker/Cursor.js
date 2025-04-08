const circle = document.querySelector('.cursor-circle');
const circle1 = document.querySelector('.cursor-circle1');
const circle2 = document.querySelector('.cursor-circle2');

const trajectories = [
  {x: 0, y: 0, ampX: 50, ampY: 20, interval: 50, direction: 1, circle: circle},
  {x: 0, y: 0, ampX: -30, ampY: 40, interval: 50, direction: -1, circle: circle1},
  {x: 0, y: 0, ampX: 40, ampY: 20, interval: 50, direction: -1, circle: circle2},
];


let direction = 1;
let interval = 0.2;
let max = 500;
let min = -500;

let mouseX = 0;
let mouseY = 0;


trajectories.forEach(off => setInterval(updateCoordinates, off.interval, off));
//setInterval(updateCoordinates, 20);

function updateCoordinates(obj){
  // console.log("running")

  // obj.x += obj.interval * obj.direction;
  // obj.y += obj.interval * obj.direction;

  // obj.circle.style.left = mouseX + Math.sin(obj.x) * obj.ampX + 'px';
  // obj.circle.style.top = mouseY + Math.cos(obj.y) * obj.ampY + 'px';
  // obj.circle.style.width = (Math.sin(obj.y) + Math.cos(obj.x)) * 50 + 'px';
  // obj.circle.style.height = (Math.sin(obj.y) + Math.cos(obj.x)) * 50 + 'px';
}

document.addEventListener('mousemove', (e) => {
  const offsetX = -9;
  const offsetY = -8;

  mouseX = e.pageX;
  mouseY = e.pageY;
});

function getRandomInt(min, max) {
  min = Math.ceil(min); // Rounds up to the nearest integer
  max = Math.floor(max); // Rounds down to the nearest integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

