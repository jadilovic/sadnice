import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

const useAxiosProducts = () => {
	// GET FILTER REQUEST
	const getAllProducts = async (
		ageFilters,
		categoryFilters,
		packagingFilters
	) => {
		console.log('axios : ', ageFilters, categoryFilters, packagingFilters);
		let querystring = '?';
		ageFilters.forEach((age) => {
			querystring = querystring.concat(`age=${age}&`);
		});
		categoryFilters.forEach((category) => {
			querystring = querystring.concat(`category=${category}&`);
		});
		packagingFilters.forEach((packaging) => {
			querystring = querystring.concat(`packaging=${packaging}&`);
		});
		//	console.log('querystring: ', querystring);
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/products${querystring}`,
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			return res.data.products;
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

	const updateProduct = async (editedProduct) => {
		console.log(editedProduct);
		const {
			_id,
			title,
			category,
			description,
			imageUrl,
			price,
			packaging,
			age,
			available,
		} = editedProduct;
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/v1/products/${_id}`,
				{
					title,
					category,
					description,
					imageUrl,
					price,
					packaging,
					age,
					available,
				},
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

	return {
		getAllProducts,
		deleteTask,
		getProduct,
		updateProduct,
		getRoles,
		deleteCloudinaryImage,
		createProduct,
		//	filterTasks,
	};
};

export default useAxiosProducts;
