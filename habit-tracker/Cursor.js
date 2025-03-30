const circle = document.querySelector('.cursor-circle');

document.addEventListener('mousemove', (e) => {
  const offsetX = -9;
  const offsetY = -8;
  circle.style.left = e.pageX + offsetX + 'px';
  circle.style.top = e.pageY + offsetY + 'px';
});