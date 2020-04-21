const uuid = require('uuid');
const clone = require('clone-deep');

const surveysById = {};

function insert(survey) {
    return put(uuid.v4(), survey);
}

function getAll() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            const surveys = Object.entries(surveysById).map(([_id, survey]) => ({
                _id,
                ...clone(survey)
            }));

            resolve(surveys);
        });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const survey = surveysById[id];

            if (!survey) return reject(new Error(`Survey ${templateId} does not exist.`));

            resolve(survey);
        });
    });
}

function put(id, survey) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            surveysById[id] = clone(survey);
            resolve();
        });
    });
}

exports.insert = insert;
exports.getAll = getAll;
exports.getById = getById;
exports.put = put;