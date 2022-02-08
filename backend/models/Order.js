const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const OrderSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please provide first name'],
			minlength: [3, 'First name must be minimum 3 characters long'],
			maxlength: [50, 'First name can be maximum 50 characters long'],
		},
		lastName: {
			type: String,
			required: [true, 'Please provide last name'],
			minlength: [3, 'Last name must be minimum 3 characters long'],
			maxlength: [50, 'Last name can be maximum 50 characters long'],
		},
		address: {
			type: String,
			required: [true, 'Please provide address'],
			minlength: [6, 'Address must be minimum 6 characters long'],
			maxlength: [30, 'Address can be maximum 30 characters long'],
		},
		city: {
			type: String,
			required: [true, 'Please provide city'],
			minlength: [3, 'City must be minimum 3 characters long'],
			maxlength: [30, 'City can be maximum 30 characters long'],
		},
		postNumber: {
			type: String,
			required: [true, 'Please provide post number'],
			minlength: [5, 'Post Number must be minimum 5 characters long'],
			maxlength: [5, 'Post Number can be maximum 5 characters long'],
		},
		phone: {
			type: String,
			required: [true, 'Please provide phone'],
			minlength: [9, 'Phone Number must be minimum 9 numbers long'],
			maxlength: [10, 'Phone Number can be maximum 10 numbers long'],
			// validate: {
			// 	validator: function (v) {
			// 		return /[0-9]{9,10}/.test(v);
			// 	},
			// 	message: (props) =>
			// 		`${props.value} nije validan broj telefona jer treba da sadrzi minimalno 9 i maksimalno 10 brojeva!`,
			// },
		},
		shoppingCart: [{ id: String, amount: Number }],
		totalOrder: {
			type: Number,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			//	required: [true, 'Please enter user'],
		},
		orderStatus: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			maxlength: [100, 'Comment can be maximum 100 characters long'],
		},
	},
	{ timestamps: true }
);

OrderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });

module.exports = mongoose.model('Order', OrderSchema);
