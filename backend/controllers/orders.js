const Order = require('../models/Order');
require('dotenv').config();
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createOrder = async (req, res) => {
	// req.body.newOrder.createdBy = req.user.userId;
	const order = await Order.create(req.body.newOrder);
	res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrders = async (req, res) => {
	let userFilters = [];
	let categoryFilters = [];
	if (req.query.userId) {
		if (Array.isArray(req.query.userId)) {
			userFilters = req.query.userId.map((id) => {
				return { ['createdBy']: id };
			});
		} else {
			userFilters.push({ ['createdBy']: req.query.userId });
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
					$or: userFilters.length > 0 ? userFilters : [{}],
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
*/
const updateOrder = async (req, res) => {
	const {
		// body: { comment },
		//	user: { userId },
		params: { id: userId },
	} = req;

	const order = await Order.findByIdAndUpdate({ _id: userId }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!order) {
		throw new NotFoundError(`Order with id ${userId} was not found`);
	}
	res.status(StatusCodes.OK).json({ order });
};

const deleteOrder = async (req, res) => {
	const {
		//	user: { userId },
		params: { id: orderId },
	} = req;
	const order = await Order.findByIdAndRemove({ _id: orderId });
	if (!order) {
		throw new NotFoundError(`No order found with id ${orderId}`);
	}
	res.status(StatusCodes.OK).json({ order });
};

module.exports = {
	getAllOrders,
	createOrder,
	getOrder,
	updateOrder,
	deleteOrder,
};
