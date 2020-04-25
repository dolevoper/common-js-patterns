import balloonDrawer from './balloonDrawer.js';

const { expect, spy } = chai;

describe('balloonDrawer', () => {
    let drawer;
    let drawStrategiesFactoryMock;
    let drawStrategySpy;

    beforeEach(() => {
        drawStrategiesFactoryMock = spy.interface({
            create: () => drawStrategySpy
        });

        drawStrategySpy = spy();

        drawer = balloonDrawer(drawStrategiesFactoryMock);
    });

    describe('draw', () => {
        let testBoundary;
        let testTarget;

        beforeEach(() => {
            testBoundary = document.createElement('div');
            testTarget = document.createElement('span');

            testBoundary.id = 'balloon-drawer-test1';
            testTarget.classList.add('target');

            testBoundary.appendChild(testTarget);
            document.body.appendChild(testBoundary);
        });

        afterEach(() => {
            testBoundary.remove();
        });

        it('should be defined', () => {
            expect(drawer).to.have.property('draw');
        });

        it('should set balloon position using draw strategy', () => {
            const balloonData = {
                targetSelector: '#balloon-drawer-test1 .target',
                position: 'position'
            };

            drawer.draw(balloonData);

            const balloon = testBoundary.querySelector('.wm-balloon');
            const targetRect = testTarget.getClientRects()[0];

            expect(drawStrategiesFactoryMock.create).to.have.been.called.with(balloonData.position);
            expect(drawStrategySpy).to.have.been.called.with(balloonData, targetRect, balloon);
        });
    });
});