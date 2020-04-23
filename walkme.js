(function () {
    const balloonData = {
        targetId: 'item1',
        width: 100,
        height: 50,
        text: 'drag me',
        position: 'right'
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

    const drawStrategiesFactory = (function () {
        const drawStrategies = new Map([
            ['bellow', drawBellow],
            ['above', drawAbove],
            ['left', drawLeft],
            ['right', drawRight]
        ]);

        return {
            create(position) {
                return drawStrategies.get(position) || drawBellow;
            }
        };
    })();

    function drawBalloon(data) {
        const target = document.getElementById(data.targetId);
        const balloon = document.createElement('div');

        const targetRect = target.getClientRects()[0];
        const drawStrategy = drawStrategiesFactory.create(data.position);

        drawStrategy(data, targetRect, balloon);

        balloon.style.position = 'absolute';
        balloon.style.width = `${data.width}px`;
        balloon.style.height = `${data.height}px`;
        balloon.style.backgroundColor = 'coral';
        balloon.innerText = data.text;

        target.parentElement.appendChild(balloon);
    }

    window.walkme = {
        play() {
            drawBalloon(balloonData);
        }
    };
})();