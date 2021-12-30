const User = require('../models/User');
const Role = require('../models/Role');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
	const users = await User.find({});
	res.status(StatusCodes.OK).json({ users, length: users.length });
};

const getUser = async (req, res) => {
	const {
		// user: { userId },
		params: { id: selectedUserId },
	} = req;
	const user = await User.findOne(
		{ _id: selectedUserId },
		{
			firstName: 1,
			lastName: 1,
			email: 1,
			role: 1,
		}
	);
	if (!user) {
		throw new NotFoundError(`No user found with id ${selectedUserId}`);
	}
	res.status(StatusCodes.OK).json({ user });
};

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

const createRoles = async (req, res) => {
	const role = await Role.create(req.body);
	res.status(StatusCodes.CREATED).json({ role });
};

const getAllRoles = async (req, res) => {
	const roles = await Role.find({});
	res.status(StatusCodes.OK).json({ roles, length: roles.length });
};

module.exports = { getAllUsers, createRoles, getAllRoles, getUser, updateUser };
