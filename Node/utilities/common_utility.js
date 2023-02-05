'use strict';
const MongoQuery = require('../utilities/mongo_query');
const Joi = require('joi');
const fs = require("fs");
const fsExtra = require('fs-extra');
const util = require("util");
const fsWriteFile = util.promisify(fs.writeFile);

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

    async uploadFile(filesObj) {
      try {
        let pathToDir = `${global.appRootDirectory}/content`;
          let arrFile = [];
          if(!Array.isArray(filesObj)) {
              arrFile.push(filesObj)
          } else {
              arrFile = filesObj
          }
          let filesPath = [];
          filesPath = await Promise.all(arrFile.map(async file => {
              await fsExtra.ensureDir(pathToDir);
              const saveToDir = `${pathToDir}/${file.name}`;
              fsWriteFile(saveToDir, file.data, "base64");
              return `${file.name}`;
          }));
          return filesPath;
      } catch (error) {
          throw error;
      }
  }
}
module.exports = CommonUtility;

