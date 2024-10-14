document.getElementById('animateBtn').addEventListener('click', () => {
    const box = document.querySelector('.box');
    const kotak = document.querySelector('.kotak');
    box.classList.toggle('animate');
    kotak.classList.toggle('animate');
  });
  