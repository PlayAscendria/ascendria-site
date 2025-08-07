// No seu arquivo js/script.js

document.addEventListener('mousemove', function(e) {
    // Seleciona o elemento de fundo
    const bg = document.getElementById('skyes-mountain');

    // Calcula o quanto o mouse se moveu do centro da tela
    // A CORREÇÃO ESTÁ AQUI:
    const moveX = (e.clientX - window.innerWidth / 2) * -0.002; // Reduzido de -0.01
    const moveY = (e.clientY - window.innerHeight / 2) * -0.002; // Reduzido de -0.01

    // Aplica o movimento ao fundo usando a propriedade transform
    if (bg) {
        bg.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    }
});