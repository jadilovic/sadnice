const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
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
	email: {
		type: String,
		required: [true, 'Navedite email adresu'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Unesite validnu email adresu',
		],
		unique: true,
	},
	password: {
		type: String,
		// required: [true, 'Please provide password'],
		// minlength: [6, 'Password must be minimum 6 characters long'],
		// maxlength: [50, 'Password can be maximum 50 characters long'],
		required: [true, 'Unesite lozinku'],
		minlength: [6, 'Lozinka mora biti minimalne dužine 3 karaktera'],
		maxlength: [50, 'Lozinka ne smije biti duža od 50 karaktera'],
	},
	role: {
		type: String,
		// required: [true, 'Please provide role'],
		// minlength: [3, 'Role must be minimum 3 characters long'],
		// maxlength: [20, 'Role can be maximum 20 characters long'],
		required: [true, 'Unesite vaš status'],
		minlength: [3, 'Status mora biti minimalne dužine 3 karaktera'],
		maxlength: [20, 'Status ne smije biti duži od 20 karaktera'],
	},
	address: {
		type: String,
		// minlength: [6, 'Address must be minimum 6 characters long'],
		// maxlength: [30, 'Address can be maximum 30 characters long'],
		minlength: [3, 'Adresa mora biti minimalne dužine 3 karaktera'],
		maxlength: [50, 'Adresa ne smije biti duže od 50 karaktera'],
	},
	city: {
		type: String,
		// minlength: [3, 'City must be minimum 3 characters long'],
		// maxlength: [30, 'City can be maximum 30 characters long'],
		minlength: [3, 'Naziv grada mora biti minimalne dužine 3 karaktera'],
		maxlength: [50, 'Naziv grada ne smije biti duže od 50 karaktera'],
	},
	postNumber: {
		type: String,
		// minlength: [5, 'Post Number must be minimum 5 characters long'],
		// maxlength: [5, 'Post Number can be maximum 5 characters long'],
		minlength: [5, 'Broj pošte mora biti minimalne dužine 5 karaktera'],
		maxlength: [5, 'Broj pošte ne smije biti duže od 5 karaktera'],
	},
	phone: {
		type: String,
		// minlength: [9, 'Phone Number must be minimum 9 numbers long'],
		// maxlength: [10, 'Phone Number can be maximum 10 numbers long'],
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
	isActive: {
		type: Boolean,
		default: true,
	},
});

UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userId: this._id, email: this.email },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
		}
	);
};

UserSchema.methods.comparePasswords = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
