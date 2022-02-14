const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const OrderSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			// required: [true, 'Please provide first name'],
			// minlength: [3, 'First name must be minimum 3 characters long'],
			// maxlength: [50, 'First name can be maximum 50 characters long'],
			required: [true, 'Unesite vaše ime'],
			minlength: [3, 'Ime mora biti minimalne dužine 3 karaktera'],
			maxlength: [50, 'Ime ne smije biti duže od 50 karaktera'],
		},
		lastName: {
			type: String,
			// required: [true, 'Please provide last name'],
			// minlength: [3, 'Last name must be minimum 3 characters long'],
			// maxlength: [50, 'Last name can be maximum 50 characters long'],
			required: [true, 'Unesite vaše prezime'],
			minlength: [3, 'Prezime mora biti minimalne dužine 3 karaktera'],
			maxlength: [50, 'Prezime ne smije biti duže od 50 karaktera'],
		},
		address: {
			type: String,
			// required: [true, 'Please provide address'],
			// minlength: [6, 'Address must be minimum 6 characters long'],
			// maxlength: [30, 'Address can be maximum 30 characters long'],
			required: [true, 'Unesite vašu adresu'],
			minlength: [3, 'Adresa mora biti minimalne dužine 3 karaktera'],
			maxlength: [50, 'Adresa ne smije biti duže od 50 karaktera'],
		},
		city: {
			type: String,
			// required: [true, 'Please provide city'],
			// minlength: [3, 'City must be minimum 3 characters long'],
			// maxlength: [30, 'City can be maximum 30 characters long'],
			required: [true, 'Unesite vaš grad'],
			minlength: [3, 'Naziv grada mora biti minimalne dužine 3 karaktera'],
			maxlength: [50, 'Naziv grada ne smije biti duže od 50 karaktera'],
		},
		postNumber: {
			type: String,
			// required: [true, 'Please provide post number'],
			// minlength: [5, 'Post Number must be minimum 5 characters long'],
			// maxlength: [5, 'Post Number can be maximum 5 characters long'],
			required: [true, 'Unesite broj pošte'],
			minlength: [5, 'Broj pošte mora biti minimalne dužine 5 karaktera'],
			maxlength: [5, 'Broj pošte ne smije biti duže od 5 karaktera'],
		},
		phone: {
			type: String,
			// required: [true, 'Please provide phone'],
			// minlength: [9, 'Phone Number must be minimum 9 numbers long'],
			// maxlength: [10, 'Phone Number can be maximum 10 numbers long'],
			required: [true, 'Unesite broj telefona'],
			minlength: [9, 'Broj telefona mora biti minimalne dužine 9 karaktera'],
			maxlength: [10, 'Broj telefona ne smije biti duži od 10 karaktera'],
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
			required: [true, 'Please enter user'],
		},
		orderStatus: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			// required: [true, 'Please provide comment'],
			// minlength: [4, 'Comment must be minimum 4 characters long'],
			// maxlength: [200, 'Comment can be maximum 100 characters long'],
			required: [true, 'Unesite komentar'],
			minlength: [4, 'Komentar mora biti minimalne dužine 4 karaktera'],
			maxlength: [200, 'Komentar ne smije biti duži od 200 karaktera'],
		},
		acceptedConditions: {
			type: String,
			// required: [true, 'Please accept web shop conditions'],
			// minlength: [8, 'Accepted must be minimum 8 characters long'],
			// maxlength: [8, 'Accepted can be maximum 100 characters long'],
			required: [true, 'Molim vas prihvatite uslove kupovine'],
			minlength: [8, 'Komentar mora biti minimalne dužine 8 karaktera'],
			maxlength: [8, 'Komentar ne smije biti duži od 8 karaktera'],
		},
	},
	{ timestamps: true }
);

OrderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });

module.exports = mongoose.model('Order', OrderSchema);
