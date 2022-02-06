import React, { useState } from 'react';
import useAxiosRequest from '../utils/useAxiosRequest';
import { Link, useHistory } from 'react-router-dom';
import { login, isAuthenticated } from '../auth/Authentication';
import UserWindow from '../utils/UserWindow';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box, Alert } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<a color="inherit" href="https://mui.com/">
				Porodično poljoprivredno gazdinstvo Adilović
			</a>
			{` ${new Date().getFullYear()}.`}
		</Typography>
	);
}

const Signup = () => {
	const history = useHistory();
	const mongoDB = useAxiosRequest();
	const screen = UserWindow();
	const [error, setError] = useState(null);
	const [fieldErrors, setFieldErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		const newUserData = {
			firstName: data.get('firstName'),
			lastName: data.get('lastName'),
			email: data.get('email'),
			password: data.get('password'),
			role: 'member',
		};
		submitData(newUserData);
	};

	const settingErrors = (errors) => {
		let initialErrors = {
			firstName: { error: false, msg: '' },
			lastName: { error: false, msg: '' },
			email: { error: false, msg: '' },
			password: { error: false, msg: '' },
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

	const submitData = async (userData) => {
		try {
			const newUserData = await mongoDB.createUser(userData);
			login(newUserData.token, newUserData.user);
			history.push('/products');
		} catch (err) {
			console.log(err);
			try {
				if (err.response.data.msg.startsWith('ValidationError: ')) {
					settingErrors(err.response.data.msg);
				} else {
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

	if (isAuthenticated()) {
		history.push('/');
	}

	return (
		<Box
			sx={{
				paddingLeft: screen.dynamicWidth < 600 ? 0 : 22,
			}}
		>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 14,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: '#648381' }}>
						<PersonAdd />
					</Avatar>
					<Typography component="h1" variant="h5">
						Registracija korisnika
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
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
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									error={fieldErrors?.firstName?.error ? true : false}
									helperText={fieldErrors?.firstName?.msg}
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="Ime"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									error={fieldErrors?.lastName?.error ? true : false}
									helperText={fieldErrors?.lastName?.msg}
									required
									fullWidth
									id="lastName"
									label="Prezime"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={fieldErrors?.email?.error ? true : false}
									helperText={fieldErrors?.email?.msg}
									required
									fullWidth
									id="email"
									label="Email adresa"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={fieldErrors?.password?.error ? true : false}
									helperText={fieldErrors?.password?.msg}
									required
									fullWidth
									name="password"
									label="Lozinka"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Registracija
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link style={{ color: '#648381' }} to="/" variant="body2">
									Već ste registrovani? Prijavi se!
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</Box>
	);
};

export default Signup;
