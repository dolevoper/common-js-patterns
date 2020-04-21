const uuid = require('uuid');
const clone = require('clone-deep');

class ConflictError extends Error {}

exports.ConflictError = ConflictError;
exports.repository = (entities = {}) => {
    const entityIds = [];

    return {
        async insert(entity) {
            const id = uuid.v4();

            entityIds.push(id);

            await put(id, entity);
        },
        
        getAll() {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    const res = entityIds.map(_id => ({
                        ...clone(entities[_id]),
                        _id
                    }))
        
                    resolve(res);
                });
            });
        },
        
        getById(id) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    if (entityIds.indexOf(id) === -1) return resolve(null);
        
                    resolve(clone(entities[id]));
                });
            });
        },
        
        put(id, entity) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (entityIds.indexOf(id) === -1) return reject(new ConflictError());

                    entities[id] = clone(entity);

                    resolve();
                });
            });
        }
    };
};