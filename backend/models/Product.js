const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please enter product title'],
			minlength: [5, 'Product title must be minimum 5 characters long'],
			maxlength: [25, 'Product title can be maximum 25 characters long'],
			unique: true,
		},
		description: {
			type: String,
			required: [true, 'Please enter product description'],
			minlength: [25, 'Product description must be minimum 25 characters long'],
			maxlength: [
				200,
				'Product description can be maximum 200 characters long',
			],
		},
		imageUrl: [
			{
				type: String,
			},
		],
		// imageUrl: {
		// 	type: String,
		// 	required: [true, 'Please select image'],
		// 	minlength: [15, 'Image URL must be minimum 15 characters long'],
		// 	maxlength: [150, 'Image URL can be maximum 150 characters long'],
		// },
		price: {
			type: Number,
			required: [true, 'Please enter product price'],
			min: [1, 'Minimum price is 1'],
			max: [100, 'Maximum price is 100'],
		},
		category: {
			type: String,
			required: [true, 'Please select category'],
			minlength: [5, 'Category must be minimum 5 characters long'],
			maxlength: [30, 'Category can be maximum 30 characters long'],
		},
		age: {
			type: Number,
			required: [true, 'Please enter product age'],
			min: [1, 'Minimum age is 1'],
			max: [3, 'Maximum age is 3'],
		},
		available: {
			type: Boolean,
			required: [true, 'Please enter if product is available'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
