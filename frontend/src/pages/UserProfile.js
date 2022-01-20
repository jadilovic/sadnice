import { useState, useEffect } from 'react';
import UserWindow from '../utils/UserWindow';
import useAxiosRequest from '../utils/useAxiosRequest';
import { useHistory } from 'react-router-dom';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	Alert,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import LoadingPage from '../components/LoadingPage';
import roles from '../data/roles';

const UserProfile = () => {
	const history = useHistory();
	const screen = UserWindow();
	let [userValues, setUserValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		postNumber: '',
	});
	const [error, setError] = useState('');
	const [fieldErrors, setFieldErrors] = useState({});
	const [loading, setLoading] = useState(true);
	const [admin, setAdmin] = useState(false);
	const mongoDB = useAxiosRequest();

	const handleChange = (event) => {
		if (event.target.name === 'isActive') {
			const isActive = event.target.value === 'true';
			setUserValues({
				...userValues,
				[event.target.name]: isActive,
			});
		} else {
			setUserValues({
				...userValues,
				[event.target.name]: event.target.value,
			});
		}
	};

	const getUserObject = async (userId) => {
		try {
			const editingUserObject = await mongoDB.getUser(userId);
			setUserValues({ ...editingUserObject.user });
			setLoading(false);
		} catch (error) {
			console.log('get user object error: ', error);
		}
	};

	useEffect(() => {
		const selectedUserId = localStorage.getItem('selectedUserId');
		const user = JSON.parse(localStorage.getItem('user'));
		if (selectedUserId) {
			getUserObject(selectedUserId);
			localStorage.removeItem('selectedUserId');
		} else {
			getUserObject(user._id);
		}
		if (user.role === 'admin') {
			setAdmin(true);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getColor = (selectedRole) => {
		const role = roles.find((role) => role.name === selectedRole);
		return role.hex;
	};

	const settingErrors = (errors) => {
		let initialErrors = {
			firstName: { error: false, msg: '' },
			lastName: { error: false, msg: '' },
			email: { error: false, msg: '' },
			city: { error: false, msg: '' },
			phone: { error: false, msg: '' },
			address: { error: false, msg: '' },
			postNumber: { error: false, msg: '' },
		};
		let errorsList = errors.replace('ValidationError: ', '');
		errorsList = errorsList.split(', ');
		errorsList.map((item) => {
			const errorItem = item.split('-');
			return (initialErrors[errorItem[0]] = {
				error: true,
				msg: errorItem[1],
			});
		});
		setFieldErrors(initialErrors);
		initialErrors = {};
		setError('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		// remove not empty values
		const propertiesArray = Object.keys(userValues);
		for (let i = 0; i < propertiesArray.length; i++) {
			if (userValues[propertiesArray[i]] === '') {
				userValues[propertiesArray[i]] = null;
			}
		}
		try {
			const editedUser = await mongoDB.updateUser(userValues);
			console.log('edited user values : ', editedUser);
			history.push('/users');
		} catch (err) {
			console.log(err.response.data.msg);
			try {
				if (err.response.data.msg.startsWith('ValidationError: ')) {
					settingErrors(err.response.data.msg);
				} else {
					console.log('test');
					setFieldErrors({});
					setError(err.response.data.msg);
				}
			} catch (error) {
				console.log('ERROR : ', error);
				setFieldErrors({});
				setError('Network error. Try again later.');
			}
		}
	};

	console.log('user profile render');

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<Box
			sx={{
				flexGrow: 1,
				paddingTop: 9,
				paddingLeft: screen.dynamicWidth < 600 ? 0 : 25,
				paddingRight: 2,
				width: '100%',
			}}
		>
			<form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Card>
					<CardHeader
						//	subheader={`${userValues.firstName} ${userValues.lastName}`}
						title="Profil korisnika"
					/>
					{error && (
						<Box
							sx={{
								paddingTop: 2,
								paddingBottom: 2,
								bgcolor: 'background.paper',
							}}
						>
							<Alert severity="error">{error}</Alert>
						</Box>
					)}
					<Divider />
					<CardContent>
						<Grid container spacing={3}>
							<Grid item md={6} xs={12}>
								<TextField
									error={fieldErrors?.firstName?.error ? true : false}
									helperText={fieldErrors?.firstName?.msg}
									fullWidth
									label="Ime"
									name="firstName"
									onChange={handleChange}
									required
									value={userValues.firstName}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									error={fieldErrors?.lastName?.error ? true : false}
									helperText={fieldErrors?.lastName?.msg}
									fullWidth
									label="Prezime"
									name="lastName"
									onChange={handleChange}
									required
									value={userValues.lastName}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									error={fieldErrors?.email?.error ? true : false}
									helperText={fieldErrors?.email?.msg}
									fullWidth
									label="Email"
									name="email"
									onChange={handleChange}
									required
									value={userValues.email}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									type={'number'}
									error={fieldErrors?.phone?.error ? true : false}
									helperText={fieldErrors?.phone?.msg}
									fullWidth
									label="Broj telefona"
									name="phone"
									onChange={handleChange}
									value={userValues.phone}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									error={fieldErrors?.address?.error ? true : false}
									helperText={fieldErrors?.address?.msg}
									fullWidth
									label="Adresa"
									name="address"
									onChange={handleChange}
									required
									value={userValues.address}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									error={fieldErrors?.city?.error ? true : false}
									helperText={fieldErrors?.city?.msg}
									fullWidth
									label="Grad"
									name="city"
									onChange={handleChange}
									required
									value={userValues.city}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									type={'number'}
									error={fieldErrors?.postNumber?.error ? true : false}
									helperText={fieldErrors?.postNumber?.msg}
									fullWidth
									label="Broj pošte"
									name="postNumber"
									onChange={handleChange}
									required
									value={userValues.postNumber}
									variant="outlined"
								/>
							</Grid>
							<Grid item md={6} xs={12}></Grid>
							{admin && (
								<>
									<Grid item md={6} xs={12}>
										<InputLabel>Odaberi status</InputLabel>
										<TextField
											sx={{
												backgroundColor: getColor(userValues.role),
												color: 'white',
												borderRadius: 1,
											}}
											fullWidth
											//	label="Select Role"
											name="role"
											onChange={handleChange}
											required
											select
											SelectProps={{ native: true }}
											value={userValues.role}
											variant="outlined"
										>
											{roles.map((role) => (
												<option
													style={{ backgroundColor: role.hex }}
													key={role.name}
													value={role.name}
												>
													{role.name}
												</option>
											))}
										</TextField>
									</Grid>

									<Grid item md={6} xs={12}>
										<InputLabel>Odaberi registraciju</InputLabel>
										<TextField
											sx={{
												backgroundColor: userValues.isActive ? 'green' : 'red',
												color: 'white',
												borderRadius: 1,
											}}
											fullWidth
											//	label="Status korisnika"
											name="isActive"
											onChange={handleChange}
											required
											select
											SelectProps={{ native: true }}
											value={userValues.isActive}
											variant="outlined"
										>
											<option style={{ backgroundColor: 'green' }} value={true}>
												Aktivan
											</option>
											<option style={{ backgroundColor: 'red' }} value={false}>
												Isključen
											</option>
										</TextField>
									</Grid>
								</>
							)}
						</Grid>
					</CardContent>
					<Divider />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							p: 2,
						}}
					>
						<Button type="submit" color="primary" variant="contained">
							Save details
						</Button>
					</Box>
				</Card>
			</form>
		</Box>
	);
};

export default UserProfile;
