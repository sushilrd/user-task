const MongoClient = require('mongodb').MongoClient;
let db_url = 'mongodb://localhost:27017/user-crud'
let _db;

module.exports = {
  connectToServer: async () => {
    try {
      _db = await MongoClient.connect(db_url, { useNewUrlParser: true})
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getDb: function () {
    return _db;
  },
};




