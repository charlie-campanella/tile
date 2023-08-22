/**
 * @file modules/credentials.js
 * @description Module for storing credentials
 * @module modules/credentials
 */

module.exports = {
	jwt: {
		signingSecret: 'secret'
	},
	mongo: {
		connectionString: process.env.MONGO_CONNECTION_STRING
	},
	openai: {
		secretKey: process.env.OPENAI_SECRET_KEY
	}
};


