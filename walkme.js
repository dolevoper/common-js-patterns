(function () {
    const balloonData = {
        targetId: 'item1',
        width: 100,
        height: 50,
        text: 'drag me',
        closeTrigger: 'dragend'
    };

    function drawBellow(data, targetRect, balloon) {
        balloon.style.top = `${targetRect.bottom + 5}px`;
        balloon.style.left = `${(targetRect.right + targetRect.left - data.width) / 2}px`;
        balloon.style.borderTop = '3px solid red';
    }

    function drawAbove(data, targetRect, balloon) {
        balloon.style.top = `${targetRect.top - data.height - 5}px`;
        balloon.style.left = `${(targetRect.right + targetRect.left - data.width) / 2}px`;
        balloon.style.borderBottom = '3px solid red';
    }

    function drawLeft(data, targetRect, balloon) {
        balloon.style.top = `${(targetRect.top + targetRect.bottom - data.height) / 2}px`;
        balloon.style.left = `${targetRect.left - data.width - 5}px`;
        balloon.style.borderRight = '3px solid red';
    }

    function drawRight(data, targetRect, balloon) {
        balloon.style.top = `${(targetRect.top + targetRect.bottom - data.height) / 2}px`;
        balloon.style.left = `${targetRect.right + 5}px`;
        balloon.style.borderLeft = '3px solid red';
    }

    function drawBalloon(data, drawStrategy = drawBellow) {
        const target = document.getElementById(data.targetId);
        const balloon = document.createElement('div');

        const targetRect = target.getClientRects()[0];

        drawStrategy(data, targetRect, balloon);

        balloon.style.position = 'absolute';
        balloon.style.width = `${data.width}px`;
        balloon.style.height = `${data.height}px`;
        balloon.style.backgroundColor = 'coral';
        balloon.innerText = data.text;

        target.parentElement.appendChild(balloon);

        target.addEventListener(data.closeTrigger, function () {
            balloon.remove();
        });
    }

    window.walkme = {
        play(drawStrategy) {
            drawBalloon(balloonData, drawStrategy);
        },
        drawStrategies: { drawBellow, drawAbove, drawLeft, drawRight }
    };
})();