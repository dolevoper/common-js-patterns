const uuid = require('uuid');
const clone = require('clone-deep');

const surveysById = {};

function insert(survey) {
    put(uuid.v4(), survey);
}

function getAll() {
    return Object.entries(surveysById).map(([_id, survey]) => ({
        _id,
        ...clone(survey)
    }));
}

function getById(id) {
    const survey = surveysById[id];

    if (!survey) throw new Error(`Survey ${templateId} does not exist.`);

    return clone(survey);
}

function put(id, survey) {
    surveysById[id] = clone(survey);
}

exports.insert = insert;
exports.getAll = getAll;
exports.getById = getById;
exports.put = put;