'use strict';
const MongoQuery = require('../utilities/mongo_query');
const Joi = require('joi');

class CommonUtility {
    constructor(payload, params = null) {
        this.payload = payload;
        this.params = params;
    }

    async getNextUserIdValue(collection_name, search_key) {
        try {
            const mongoQuery = new MongoQuery();
            let id = await mongoQuery.getNextUserIdValue(collection_name, search_key);
            return id;
        } catch (error) {
            throw error;
        }
    }

    validateSchema(payload, schema) {
        this.schema = schema;
        if (Array.isArray(payload) === true) {
          this.schema = Joi.array().items(schema);
        }
        this.result = Joi.validate(payload, this.schema, {abortEarly: true, stripUnknown: true});
        if (this.result.error === null) {
          return this.result.value;
        }
        throw new Error(this.result.error);
      }
}
module.exports = CommonUtility;

