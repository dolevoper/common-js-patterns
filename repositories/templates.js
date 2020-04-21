const uuid = require('uuid');
const clone = require('clone-deep');

const templatesById = {};

function insert(template) {
    return put(uuid.v4(), template);
}

function getAll() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            const templates = Object.entries(templatesById).map(([_id, template]) => ({
                _id,
                ...clone(template)
            }));

            resolve(templates);
        });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const template = templatesById[id];

            if (!template) return reject(new Error(`Survey ${templateId} does not exist.`));

            resolve(template);
        });
    });
}

function put(id, template) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            templatesById[id] = clone(template);
            resolve();
        });
    });
}

exports.insert = insert;
exports.getAll = getAll;
exports.getById = getById;
exports.put = put;