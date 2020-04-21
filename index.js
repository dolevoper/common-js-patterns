const templatesRepository = require('./repositories/templates');
const surveysRepository = require('./repositories/surveys');

function defineSurvey(title, questions) {
    // TODO: authorization
    // TODO: validatation

    templatesRepository.insert({ title, questions });
}

function openSurvey(templateId) {
    // TODO: authorization
    const template = templatesRepository.getById(templateId);

    if (template.open) throw new Error(`Survey ${templateId} is already open.`);

    surveysRepository.insert({ templateId, responses: [] });
    templatesRepository.put(templateId, { ...template, open: true });
}

function closeSurvey(surveyId) {
    // TODO: authorization
    const survey = surveysRepository.getById(surveyId);

    if (survey.closed) throw new Error(`Survey ${surveyId} is already closed.`);

    surveysRepository.put(surveyId, { ...survey, closed: true });

    const template = templatesRepository.getById(survey.templateId);

    templatesRepository.put(survey.templateId, { ...template, open: false });
}

function submitResponse(surveyId, response) {
    const survey = surveysRepository.getById(surveyId);

    if (survey.closed) throw new Error(`Survey ${surveyId} is aleady closed.`);

    // TODO: response validation

    surveysRepository.put(surveyId, { ...survey, resposnes: survey.responses.concat([response]) });
}

function getResults(surveyId) {
    const survey = surveysRepository.getById(surveyId);

    if (!survey.closed) throw new Error(`Survey ${surveyId} is still ongoing.`);

    const results = {}; // TODO: calculate results table from responses

    return results;
}

exports.defineSurvey = defineSurvey;
exports.openSurvey = openSurvey;
exports.closeSurvey = closeSurvey;
exports.submitResponse = submitResponse;
exports.getResults = getResults;