import axios from 'axios';
import { getUserToken, getUserData } from '../auth/Authentication';

const useAxiosOrders = () => {
	// GET FILTER REQUEST
	const getAllOrders = async (ageFilters, categoryFilters) => {
		let querystring = '?';
		ageFilters.forEach((age) => {
			querystring = querystring.concat(`age=${age}&`);
		});
		categoryFilters.forEach((category) => {
			querystring = querystring.concat(`category=${category}&`);
		});
		//	console.log('querystring: ', querystring);
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/orders${querystring}`,
			// headers: {
			// 	authorization: `Bearer ${getUserToken()}`,
			// },
		}).then((res) => {
			return res.data.orders;
		});
	};

	const getProduct = async (productId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/products/${productId}`, {
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

	const deleteTask = async (taskId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			await axios
				.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${taskId}`, {
					headers,
				})
				.then((res) => {
					console.log('task deleted: ', res.data);
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	const deleteCloudinaryImage = async (publicId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			await axios
				.delete(
					`${process.env.REACT_APP_SERVER_URL}/api/v1/products/images/${publicId}`,
					{
						headers,
					}
				)
				.then((res) => {
					console.log('image deleted: ', res.data);
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	const createOrder = async (newOrder) => {
		console.log('test create order');
		if (getUserData()?._id) {
			newOrder.createdBy = getUserData()._id;
		} else {
			newOrder.createdBy = '62017af2ee92a0853a8c0021';
		}
		return axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/orders`,
			data: {
				newOrder,
			},
			// headers: {
			// 	authorization: `Bearer ${getUserToken()}`,
			// },
		}).then((res) => {
			console.log('order created: ', res.data);
			return res.data.order;
		});
	};

	return {
		getAllOrders,
		deleteTask,
		getProduct,
		updateTask,
		getRoles,
		deleteCloudinaryImage,
		createOrder,
		//	filterTasks,
	};
};

export default useAxiosOrders;
