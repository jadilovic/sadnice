const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema(
	{
		value: {
			type: String,
			required: [true, 'Please enter user role'],
			minlength: [5, 'User role must be minimum 5 characters long'],
			maxlength: [25, 'User role can be maximum 25 characters long'],
		},
		label: {
			type: String,
			required: [true, 'Please enter role label'],
			minlength: [5, 'Role label must be minimum 5 characters long'],
			maxlength: [25, 'Role label can be maximum 25 characters long'],
		},
		color: {
			type: String,
			required: [true, 'Please enter role color'],
			minlength: [3, 'Role color must be minimum 3 characters long'],
			maxlength: [15, 'Role color can be maximum 15 characters long'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Role', RoleSchema);
