const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please enter product title'],
			minlength: [4, 'Product title must be minimum 4 characters long'],
			maxlength: [25, 'Product title can be maximum 25 characters long'],
		},
		description: {
			type: String,
			required: [true, 'Please enter product description'],
			minlength: [25, 'Product description must be minimum 25 characters long'],
			maxlength: [
				400,
				'Product description can be maximum 400 characters long',
			],
		},
		imageUrl: [
			{
				type: String,
			},
		],
		price: {
			type: Number,
			required: [true, 'Please enter product price'],
			min: [0.3, 'Minimum price is 0.3'],
			max: [100, 'Maximum price is 100'],
		},
		category: {
			type: String,
			required: [true, 'Please select category'],
			minlength: [5, 'Category must be minimum 5 characters long'],
			maxlength: [30, 'Category can be maximum 30 characters long'],
		},
		packaging: {
			type: String,
			required: [true, 'Please select packaging'],
			minlength: [5, 'Packaging must be minimum 5 characters long'],
			maxlength: [30, 'Packaging can be maximum 30 characters long'],
		},
		age: {
			type: Number,
			required: [true, 'Please enter product age'],
			min: [1, 'Minimum age is 1'],
			max: [4, 'Maximum age is 4'],
		},
		available: {
			type: Boolean,
			required: [true, 'Please enter if product is available'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
