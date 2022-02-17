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
	let ageFilters = [];
	let categoryFilters = [];
	let packagingFilters = [];
	if (req.query.age) {
		if (Array.isArray(req.query.age)) {
			ageFilters = req.query.age.map((age) => {
				return { ['age']: age };
			});
		} else {
			ageFilters.push({ ['age']: req.query.age });
		}
	}
	if (req.query.category) {
		if (Array.isArray(req.query.category)) {
			categoryFilters = req.query.category.map((category) => {
				return { ['category']: category };
			});
		} else {
			categoryFilters.push({ ['category']: req.query.category });
		}
	}
	if (req.query.packaging) {
		if (Array.isArray(req.query.packaging)) {
			packagingFilters = req.query.packaging.map((packagingit) => {
				return { ['packaging']: packagingit };
			});
		} else {
			packagingFilters.push({ ['packaging']: req.query.packaging });
		}
	}

	const products = await Product.find(
		{
			$and: [
				{
					$or: ageFilters.length > 0 ? ageFilters : [{}],
				},
				{
					$or: categoryFilters.length > 0 ? categoryFilters : [{}],
				},
				{
					$or: packagingFilters.length > 0 ? packagingFilters : [{}],
				},
			],
			//	createdBy: req.user.userId,
		}
		// {
		// 	currentStatus: 1,
		// 	name: 1,
		// 	description: 1,
		// 	updatedAt: 1,
		// 	createdAt: 1,
		// 	avatarIcon: 1,
		// 	avatarColor: 1,
		// }
	);
	// .sort({
	// 	createdAt: -1,
	// });
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
			age: 1,
			packaging: 1,
			category: 1,
		}
	);
	if (!product) {
		throw new NotFoundError(`No product found with id ${selectedProductId}`);
	}
	res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
	const {
		params: { id: productId },
	} = req;

	const product = await Product.findByIdAndUpdate(
		{ _id: productId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!product) {
		throw new NotFoundError(`Product with id ${productId} was not found`);
	}
	res.status(StatusCodes.OK).json({ product });
};

const deleteCloudinaryImage = async (req, res) => {
	const {
		//	user: { userId },
		params: { id: publicId },
	} = req;
	cloudinary.uploader.destroy(publicId, function (result) {
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
*/

module.exports = {
	getAllProducts,
	createProduct,
	getProduct,
	updateProduct,
	deleteCloudinaryImage,
};
