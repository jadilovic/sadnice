import axios from 'axios';
import { getUserToken, getUserData } from '../auth/Authentication';

const useAxiosOrders = () => {
	// GET FILTER REQUEST
	const getAllOrders = async (userIdArr, categoryFilters) => {
		let querystring = '?';
		userIdArr.forEach((userId) => {
			querystring = querystring.concat(`userId=${userId}&`);
		});
		categoryFilters.forEach((category) => {
			querystring = querystring.concat(`category=${category}&`);
		});
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

	const updateOrder = async (orderId, comment, orderStatus) => {
		// const headers = {
		// 	Authorization: `Bearer ${getUserToken()}`,
		// };
		return axios
			.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/v1/orders/${orderId}`,
				{ comment, orderStatus }
				// {
				// 	headers,
				// }
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

	const deleteOrder = async (orderId) => {
		// const headers = {
		// 	Authorization: `Bearer ${getUserToken()}`,
		// };
		try {
			return axios
				.delete(
					`${process.env.REACT_APP_SERVER_URL}/api/v1/orders/${orderId}`,
					{
						//	headers,
					}
				)
				.then((res) => {
					return res.data.order;
				});
		} catch (err) {
			console.log(err);
			return err.response.msg;
		}
	};

	const createOrder = async (newOrder) => {
		if (getUserData()?._id) {
			newOrder.createdBy = getUserData()._id;
			newOrder.email = getUserData().email;
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
			return res.data.order;
		});
	};

	return {
		getAllOrders,
		deleteOrder,
		getProduct,
		updateOrder,
		getRoles,
		createOrder,
		//	filterTasks,
	};
};

export default useAxiosOrders;
