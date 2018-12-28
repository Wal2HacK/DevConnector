let mongoose = require('mongoose')
let Schema = mongoose.Schema

// Create Schema
let UserSchema = new Schema({
	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = User = mongoose.model('users', UserSchema)