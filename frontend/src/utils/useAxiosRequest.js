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
		deleteUser,
		createUser,
		userLogin,
		getAllUsers,
		getUser,
		updateUser,
	};
};

export default useAxiosRequest;
