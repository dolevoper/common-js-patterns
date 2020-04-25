import balloonDrawer from './balloonDrawer.js';
import * as drawStrategiesFactory from './drawStrategyFactory.js';

const balloonData = {
    targetSelector: '#item1',
    width: 100,
    height: 50,
    text: 'drag me',
    closeTrigger: 'dragend',
    position: 'right'
};

const drawer = balloonDrawer(drawStrategiesFactory);

window.walkme = {
    play() {
        drawer.draw(balloonData);
    }
};