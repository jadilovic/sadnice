const Product = require('../models/Product');
require('dotenv').config();
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
var cloudinary = require('cloudinary').v2;

// Change cloud name, API Key, and API Secret below

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createProduct = async (req, res) => {
	const product = await Product.create(req.body.newProduct);
	res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
	const products = await Product.find({});
	res.status(StatusCodes.OK).json({ products, length: products.length });
};

const getProduct = async (req, res) => {
	const {
		// user: { userId },
		params: { id: selectedProductId },
	} = req;
	const product = await Product.findOne(
		{ _id: selectedProductId },
		{
			title: 1,
			description: 1,
			imageUrl: 1,
			price: 1,
			available: 1,
		}
	);
	if (!product) {
		throw new NotFoundError(`No product found with id ${selectedProductId}`);
	}
	res.status(StatusCodes.OK).json({ product });
};

const deleteCloudinaryImage = async (req, res) => {
	console.log('cloudinary');
	const {
		user: { userId },
		params: { id: publicId },
	} = req;
	cloudinary.uploader.destroy(publicId, function (result) {
		console.log(result);
		res.status(StatusCodes.OK).json({ result });
	});
	/*
	const task = await Task.findByIdAndRemove({ _id: taskId, createdBy: userId });
	if (!task) {
		throw new NotFoundError(`No task found with id ${taskId}`);
	}
	
	res.status(StatusCodes.OK).json({ task });
	*/
};
/*
const emailExists = async (email, userId) => {
	const userObject = await User.findOne({
		email: email,
	});
	if (userObject) {
		if (userObject._id.toString() === userId) {
			return 'current';
		} else {
			return 'exists';
		}
	} else {
		return 'new';
	}
};

const updateUser = async (req, res) => {
	const {
		body: { firstName, lastName, email },
		//	user: { userId },
		params: { id: userId },
	} = req;
	const userEmailStatus = await emailExists(email, userId);

	if (userEmailStatus === 'exists') {
		throw new BadRequestError(
			'ValidationError: email-Entered email already exists. Please enter different email.'
		);
	}
	if (userEmailStatus === 'current') {
		delete req.body.email;
	}

	const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!user) {
		throw new NotFoundError(`User with id ${userId} was not found`);
	}
	res.status(StatusCodes.OK).json({ user });
};
*/

module.exports = {
	getAllProducts,
	createProduct,
	getProduct,
	deleteCloudinaryImage,
};
