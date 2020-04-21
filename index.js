const templatesRepository = require('./repositories/templates');
const surveysRepository = require('./repositories/surveys');

async function defineSurvey(title, questions) {
    // TODO: authorization
    // TODO: validatation

    await templatesRepository.insert({ title, questions });
}

async function openSurvey(templateId) {
    // TODO: authorization
    const template = await templatesRepository.getById(templateId);

    if (template.open) throw new Error(`Survey ${templateId} is already open.`);

    await Promise.all([
        surveysRepository.insert({ templateId, responses: [] }),
        templatesRepository.put(templateId, { ...template, open: true })
    ]);
}

async function closeSurvey(surveyId) {
    // TODO: authorization
    const survey = await surveysRepository.getById(surveyId);

    if (survey.closed) throw new Error(`Survey ${surveyId} is already closed.`);

    const template = await templatesRepository.getById(survey.templateId);

    await Promise.all([
        surveysRepository.put(surveyId, { ...survey, closed: true }),
        templatesRepository.put(survey.templateId, { ...template, open: false })
    ]);
}

async function submitResponse(surveyId, response) {
    const survey = await surveysRepository.getById(surveyId);

    if (survey.closed) throw new Error(`Survey ${surveyId} is aleady closed.`);

    // TODO: response validation

    await surveysRepository.put(surveyId, { ...survey, resposnes: survey.responses.concat([response]) });
}

async function getResults(surveyId) {
    const survey = await surveysRepository.getById(surveyId);

    if (!survey.closed) throw new Error(`Survey ${surveyId} is still ongoing.`);

    const results = {}; // TODO: calculate results table from responses

    return results;
}

exports.defineSurvey = defineSurvey;
exports.openSurvey = openSurvey;
exports.closeSurvey = closeSurvey;
exports.submitResponse = submitResponse;
exports.getResults = getResults;