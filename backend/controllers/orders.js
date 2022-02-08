const Order = require('../models/Order');
require('dotenv').config();
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createOrder = async (req, res) => {
	// console.log(req.body.newOrder);
	// req.body.newOrder.createdBy = req.user.userId;
	const order = await Order.create(req.body.newOrder);
	res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrders = async (req, res) => {
	// const products = await Product.find({});
	let ageFilters = [];
	let categoryFilters = [];
	// console.log('req.query: ', req.query);
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

	const orders = await Order.find(
		{
			$and: [
				{
					$or: ageFilters.length > 0 ? ageFilters : [{}],
				},
				{
					$or: categoryFilters.length > 0 ? categoryFilters : [{}],
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
	res.status(StatusCodes.OK).json({ orders, length: orders.length });
};

const getOrder = async (req, res) => {
	const {
		// user: { userId },
		params: { id: selectedProductId },
	} = req;
	const product = await Order.findOne(
		{ _id: selectedProductId },
		{
			title: 1,
			description: 1,
			imageUrl: 1,
			price: 1,
			available: 1,
			age: 1,
		}
	);
	if (!product) {
		throw new NotFoundError(`No product found with id ${selectedProductId}`);
	}
	res.status(StatusCodes.OK).json({ product });
};

/*
	const task = await Task.findByIdAndRemove({ _id: taskId, createdBy: userId });
	if (!task) {
		throw new NotFoundError(`No task found with id ${taskId}`);
	}
	
	res.status(StatusCodes.OK).json({ task });
	*/
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
	getAllOrders,
	createOrder,
	getOrder,
};
