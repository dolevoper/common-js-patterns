export default (drawStrategiesFactory) => ({
    draw(data) {
        const target = document.querySelector(data.targetSelector);
        const balloon = document.createElement('div');
    
        const targetRect = target.getClientRects()[0];
        const drawStrategy = drawStrategiesFactory.create(data.position);
    
        drawStrategy(data, targetRect, balloon);
    
        balloon.style.position = 'absolute';
        balloon.style.width = `${data.width}px`;
        balloon.style.height = `${data.height}px`;
        balloon.style.backgroundColor = 'coral';
        balloon.innerText = data.text;
        balloon.classList.add('wm-balloon');
    
        target.parentElement.appendChild(balloon);
    
        target.addEventListener(data.closeTrigger, function () {
            balloon.remove();
        });
    }
});