/**
 * @file modules/db.js
 * @description Module for connecting to a MongoDB instance
 * @module modules/db
 */

const connString = require('./credentials.js').mongo.connectionString; //Get connection string from credentials file
const mongoose = require('mongoose'); //Get mongoose
//Options object for connection
let opts = {//Database connection options object
	keepAlive: true, //Keep connection alive rather than closing it and reopening it
	keepAliveInitialDelay: 300000 //number of milliseconds to wait before initiating keepAlive on the socket
};
const connectDB = async function(blnOpen){
	if (blnOpen) { //If true, open database connection
		return mongoose.connect(connString, opts)
			.then( //Callback functions
				function() { //Success
					let conn = mongoose.connection;
					console.log(`Database is connected on ${new Date().toLocaleString()}: ${conn.host}:${conn.port} @ ${conn.name}`);
				},
				function(err) { //Error
					console.log("Problem while connecting database " + err);
				}
			)
	} else { //Close connection
		return mongoose.connection.close()
			.then( //Callback functions
				function() { //Success
					console.log(`MongoDB connection closed on ${new Date().toLocaleString()}`);
				}, function(err) { //Error
					console.log("Problem while closing database " + err);
				}
			)			
	}
}
module.exports = connectDB; //Export function


