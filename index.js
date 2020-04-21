const uuid = require('uuid');

const templatesById = {};
const surveysById = {};

function defineSurvey(title, questions) {
    // TODO: authorization
    // TODO: validatation

    const id = uuid.v4();
    const template = { id, title, questions };

    templatesById[id] = template;

    return template;
}

function openSurvey(templateId) {
    // TODO: authorization
    const template = templatesById[templateId];

    if (!template) throw new Error(`Survey ${templateId} does not exist.`);
    if (template.open) throw new Error(`Survey ${templateId} is already open.`);

    const id = uuid.v4();
    const survey = { id, templateId, responses: [] };

    surveysById[id] = survey;
    template.open = true;

    return { id, template };
}

function closeSurvey(surveyId) {
    // TODO: authorization
    const survey = surveysById[surveyId];

    if (!survey || survey.closed) throw new Error(`There is no open survey with id ${surveyId}`);

    survey.closed = true;

    const template = templatesById[survey.templateId];

    template.open = false;
}

function submitResponse(surveyId, response) {
    const survey = surveysById[surveyId];

    if (!survey) throw new Error(`There is no survey with id ${surveyId}`);
    if (survey.closed) throw new Error(`Survey ${surveyId} is aleady closed.`);

    // TODO: response validation

    survey.responses.push(response);
}

function getResults(surveyId) {
    const survey = surveysById[surveyId];

    if (!survey) throw new Error(`There is no survey with id ${surveyId}`);
    if (!survey.closed) throw new Error(`Survey ${surveyId} is still ongoing.`);

    const results = {}; // TODO: calculate results table from responses

    return results;
}

exports.defineSurvey = defineSurvey;
exports.openSurvey = openSurvey;
exports.closeSurvey = closeSurvey;
exports.submitResponse = submitResponse;
exports.getResults = getResults;