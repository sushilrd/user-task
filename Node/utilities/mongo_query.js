"use strict";
const mongoClient = require("../db/connection");

class MongoQuery {
    constructor() {
        this.db = mongoClient.getDb().db();
    }

    async get(query_data, collection_name) {
        const { query, projection } = query_data;
        try {
            if (collection_name != null && collection_name != '') {
                let condition = {};
                let fields = {
                    projection: {}
                };
                if (Object.keys(query).length) {
                    condition = query;
                }
                if (projection && Object.keys(projection).length) {
                    fields.projection = projection;
                }
                const response = await this.db.collection(collection_name).find(condition, fields).toArray();
                return response;
            }
        } catch (error) {
            throw error;
        }
    }

    async getOne(query_data, collection_name) {
        const { query, projection } = query_data;
        try {
            if (collection_name != null && collection_name != '') {
                let condition = {};
                let fields = {
                    projection: {}
                };
                if (Object.keys(query).length) {
                    condition = query;
                }
                if (projection && Object.keys(projection).length) {
                    fields.projection = projection;
                }
                const response = await this.db.collection(collection_name).findOne(condition, fields);
                return response;
            }
        } catch (error) {
            throw error;
        }
    }

    async insertOne(query_data, collection_name) {
        try {
            const { query } = query_data;
            if (collection_name != null && collection_name != '') {
                let result = await this.db.collection(collection_name).insertOne(query);
                return result;
            }
        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdate(query_data, collection_name) {
        const { query, update } = query_data;
        let options = {
            "returnOriginal": false
        }
        if (query_data.hasOwnProperty('options')) {
            Object.assign(options, query_data.options);
        }
        try {
            if (collection_name != null && collection_name != '') {
                let result = await this.db.collection(collection_name).findOneAndUpdate(query, update, options);
                return result;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(query_data, collection_name) {
        const { query } = query_data;
        try {
            if (collection_name != null && collection_name != '') {
                return await this.db.collection(collection_name).deleteOne(query);
            }
        } catch (error) {
            throw error;
        }
    }

    async getNextUserIdValue(collection_name, search_key) {
        try {
            if (collection_name != null && collection_name != '') {
                let collection = this.db.collection(collection_name);
                let sequenceDocument = await collection.findOneAndUpdate(
                    { _id: search_key },
                    { $inc: { "sequence_value": 1 } },
                    { new: true, returnOriginal: false, }
                );

                return sequenceDocument.value.sequence_value;
            }
        } catch (error) {
            throw error;
        }
    }

}

module.exports = MongoQuery;
