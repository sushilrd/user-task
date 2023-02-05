
const mongoClient = require("../../db/connection");
const MongoQuery = require("../../utilities/mongo_query");
const CommonUtility = require('../../utilities/common_utility');
const { userSchema } = require("../../models/user/user");
const user_details = 'user_details'

class User {
    constructor(payload, params, files) {
		this.payload = payload;
		this.params = params;
        this.files = files;
		this.mongoQuery = new MongoQuery();
        this.commonUtility = new CommonUtility();
        this.db = mongoClient.getDb().db('user-crud');
	}


    async createUser() {
        try {
            let response = [];

            const validatedData = this.commonUtility.validateSchema(
                this.payload.data,
                userSchema.addUser()
            );
            let email_query = {
                query : {
                    email : validatedData.email
                }
            }

            let emailData = await this.mongoQuery.get(email_query, user_details);
            if(emailData && emailData.length) {
                throw Error("Email id already exists", 500, "createUser")
            }
            
			let file_path = await this.commonUtility.uploadFile(this.files.profile_image)
            let id = await this.commonUtility.getNextUserIdValue('counters', "user_id");

            let query = {
                query : {
                    id : id,
                    first_name : validatedData.first_name,
                    last_name : validatedData.last_name,
                    email : validatedData.email,
                    phone_no : validatedData.phone_no,
                    file_path : file_path[0]
                }
            }
            

            response = await this.mongoQuery.insertOne(query, user_details)


            return "user added";

        } catch(error) {
            let message = error.message;
            throw new Error(message)
        }
    }

    async getUsers() {
        try {
            let query_data = {
                query:{},
                projection :{_id:0}
            }

            let response = await this.mongoQuery.get(query_data, user_details);
            return response;
        } catch(error) {
            throw error
        }
    }

    async getUser() {
        try {
            const validatedData = this.commonUtility.validateSchema(
                this.params,
                userSchema.getUser()
            );
           
            let query_data = {
                query:{ id : Number(validatedData.id)},
                projection :{_id : 0}
            }

            let response = await this.mongoQuery.get(query_data, user_details);
            return response;
        } catch(error) {
            throw error
        }
    }

    async updateUser() {
        try {
            const validatedData = this.commonUtility.validateSchema(
                this.params,
                userSchema.getUser()
            );
            this.payload.user_data = JSON.parse(this.payload.user_data )
            let email_query = {
                query : {
                    email :  this.payload.user_data.email,
                    id : {$ne : Number(validatedData.id)}
                }
            }

            let emailData = await this.mongoQuery.get(email_query, user_details);
            if(emailData && emailData.length) {
                throw Error("Email id already exists", 500, "createUser")
            }
            if(this.files &&this.files.profile_image ) {
                let file_path = await this.commonUtility.uploadFile(this.files.profile_image);
                this.payload.user_data.file_path = file_path[0]
            }
            
            let query_data = {
                query:{ id : Number(validatedData.id)},
                update :{
                    $set : this.payload.user_data
                }
            }
            
            let response = await this.mongoQuery.findOneAndUpdate(query_data, user_details)
            return response;

        } catch(error) {
            throw error
        }
    }

    async deleteUser() {
        try {
            const validatedData = this.commonUtility.validateSchema(
                this.params,
                userSchema.getUser()
            );
           
            let query_data = {
                query:{ id : Number(validatedData.id)},
                projection :{_id : 0}
            }

            let response = await this.mongoQuery.deleteOne(query_data, user_details);
            return response;
        } catch(error) {
            throw error
        }
    }
}

module.exports = User;
