import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

const useAxiosRequest = () => {
	const createUser = async (userCredentials) => {
		return axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signup`,
			data: {
				firstName: userCredentials.firstName,
				lastName: userCredentials.lastName,
				email: userCredentials.email,
				password: userCredentials.password,
				role: userCredentials.role,
			},
			headers: new Headers({ 'Content-Type': 'application/json' }),
		}).then((res) => {
			return res.data;
		});
	};

	const userLogin = async (userCredentials) => {
		return axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`,
			data: {
				email: userCredentials.email,
				password: userCredentials.password,
			},
			headers: new Headers({ 'Content-Type': 'application/json' }),
		}).then((res) => {
			return res.data;
		});
	};

	// GET USERS AND FILTER REQUEST
	const getAllUsers = async (roleFilters, otherFilters) => {
		let querystring = '?';
		roleFilters.forEach((roleName) => {
			querystring = querystring.concat(`role=${roleName}&`);
		});
		otherFilters.forEach((other) => {
			querystring = querystring.concat(`other=${other}&`);
		});
		console.log('querystring: ', querystring);
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/users${querystring}`,
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			return res.data.users;
		});
	};

	const getUser = async (userId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${userId}`, {
				headers,
			})
			.then((res) => {
				return res.data;
			});
	};

	const updateUser = async (editedUser) => {
		const {
			_id,
			email,
			firstName,
			lastName,
			role,
			phone,
			address,
			city,
			postNumber,
			isActive,
		} = editedUser;
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${_id}`,
				{
					email,
					firstName,
					lastName,
					role,
					phone,
					address,
					city,
					postNumber,
					isActive,
				},
				{
					headers,
				}
			)
			.then((res) => {
				return res.data;
			});
	};

	// GET FILTER REQUEST
	const getAllTasks = async (iconFilters, statusFilters) => {
		let querystring = '?';
		iconFilters.forEach((iconName) => {
			querystring = querystring.concat(`avatarIcon=${iconName}&`);
		});
		statusFilters.forEach((status) => {
			querystring = querystring.concat(`currentStatus=${status}&`);
		});
		//	console.log('querystring: ', querystring);
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks${querystring}`,
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			return res.data.tasks;
		});
	};

	const createTask = async (newTask) => {
		await axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`,
			data: {
				newTask,
			},
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			console.log('task created: ', res.data);
		});
	};

	const getTask = async (taskId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${taskId}`, {
				headers,
			})
			.then((res) => {
				return res.data;
			});
	};

	const updateTask = async (editedTask) => {
		const { _id, name, currentStatus, description, avatarColor, avatarIcon } =
			editedTask;
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${_id}`,
				{ name, currentStatus, description, avatarColor, avatarIcon },
				{
					headers,
				}
			)
			.then((res) => {
				return res.data;
			});
	};

	const getTaskStatuses = async () => {
		try {
			return axios({
				method: 'GET',
				url: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/status`,
				headers: {
					authorization: `Bearer ${getUserToken()}`,
				},
			}).then((res) => {
				return res.data.statuses;
			});
		} catch (err) {
			console.log(err.response);
			return err.response.data.msg;
		}
	};

	const getRoles = async () => {
		try {
			return axios({
				method: 'GET',
				url: `${process.env.REACT_APP_SERVER_URL}/api/v1/users/roles`,
				headers: {
					authorization: `Bearer ${getUserToken()}`,
				},
			}).then((res) => {
				return res.data.roles;
			});
		} catch (err) {
			console.log(err.response);
			return err.response.data.msg;
		}
	};

	// const deleteTask = async (taskId) => {
	// 	const headers = {
	// 		Authorization: `Bearer ${getUserToken()}`,
	// 	};
	// 	try {
	// 		await axios
	// 			.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${taskId}`, {
	// 				headers,
	// 			})
	// 			.then((res) => {
	// 				console.log('task deleted: ', res.data);
	// 			});
	// 	} catch (err) {
	// 		console.log(err.response);
	// 	}
	// };

	// const deleteCloudinaryImage = async (publicId) => {
	// 	const headers = {
	// 		Authorization: `Bearer ${getUserToken()}`,
	// 	};
	// 	try {
	// 		await axios
	// 			.delete(
	// 				`${process.env.REACT_APP_SERVER_URL}/api/v1/products/images/${publicId}`,
	// 				{
	// 					headers,
	// 				}
	// 			)
	// 			.then((res) => {
	// 				console.log('image deleted: ', res.data);
	// 			});
	// 	} catch (err) {
	// 		console.log(err.response);
	// 	}
	// };

	const createProduct = async (newProduct) => {
		await axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/products`,
			data: {
				newProduct,
			},
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			console.log('product created: ', res.data);
		});
	};

	// // FILTER POST REQUEST
	// const filterTasks = async (iconFilters, statusFilters) => {
	// 	try {
	// 		return axios({
	// 			method: 'POST',
	// 			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/filters`,
	// 			data: {
	// 				iconFilters,
	// 				statusFilters,
	// 			},
	// 			headers: {
	// 				authorization: `Bearer ${getUserToken()}`,
	// 			},
	// 		}).then((res) => {
	// 			return res.data.filteredTasks;
	// 		});
	// 	} catch (err) {
	// 		console.log(err.response);
	// 		return err.response.data.msg;
	// 	}
	// };

	const deleteUser = async (userId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			return axios
				.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${userId}`, {
					headers,
				})
				.then((res) => {
					return res.data.user;
				});
		} catch (err) {
			console.log(err);
			return err.response.msg;
		}
	};

	return {
		getTaskStatuses,
		deleteUser,
		getAllTasks,
		createTask,
		getTask,
		createUser,
		userLogin,
		updateTask,
		getAllUsers,
		getRoles,
		getUser,
		updateUser,
		// deleteCloudinaryImage,
		createProduct,
		//	filterTasks,
	};
};

export default useAxiosRequest;
