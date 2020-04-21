const { repository, ConflictError } = require('./repository');

exports.templates = repository();
exports.surveys = repository();
exports.ConflictError = ConflictError;