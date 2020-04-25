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

const drawStrategies = new Map([
    ['bellow', drawBellow],
    ['above', drawAbove],
    ['left', drawLeft],
    ['right', drawRight]
]);

export function create(position) {
    return drawStrategies.get(position) || drawBellow;
}