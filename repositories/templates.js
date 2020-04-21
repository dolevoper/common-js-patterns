const uuid = require('uuid');
const clone = require('clone-deep');

const templatesById = {};

function insert(template) {
    put(uuid.v4(), template);
}

function getAll() {
    return Object.entries(templatesById).map(([_id, template]) => ({
        _id,
        ...clone(template)
    }));
}

function getById(id) {
    const template = templatesById[id];

    if (!template) throw new Error(`Survey ${templateId} does not exist.`);

    return clone(template);
}

function put(id, template) {
    templatesById[id] = clone(template);
}

exports.insert = insert;
exports.getAll = getAll;
exports.getById = getById;
exports.put = put;