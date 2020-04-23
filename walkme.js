(function () {
    const balloonData = {
        targetId: 'item1',
        width: 100,
        height: 50,
        text: 'drag me'
    };

    function drawBalloon(data) {
        const target = document.getElementById(data.targetId);
        const balloon = document.createElement('div');
        
        const targetRect = target.getClientRects()[0];
        
        balloon.style.position = 'absolute';
        balloon.style.top = `${targetRect.bottom + 5}px`;
        balloon.style.left = `${(targetRect.right + targetRect.left - data.width) / 2}px`;
        balloon.style.width = `${data.width}px`;
        balloon.style.height = `${data.height}px`;
        balloon.style.backgroundColor = 'coral';
        balloon.style.borderTop = '3px solid red';
        balloon.innerText = data.text;
        
        target.parentElement.appendChild(balloon);
    }

    window.walkme = {
        play() {
            drawBalloon(balloonData);
        }
    };
})();