import React, { useState } from 'react';
import useAxiosRequest from '../utils/useAxiosRequest';
import { Link, useHistory } from 'react-router-dom';
import { Box, Alert, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { login, isAuthenticated } from '../auth/Authentication';
import Page from '../components/Page';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import jagodicasto from '../images/jagodicasto.jpg';
import UserWindow from '../utils/UserWindow';

const RootStyle = styled(Page)(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'flex',
	},
	marginTop: 70,
}));

const SectionStyle = styled(Card)(({ theme }) => ({
	marginTop: 25,
	width: '100%',
	maxWidth: 900,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
}));

const ContentStyle = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: theme.spacing(3, 0),
}));

function Copyright(props) {
	return (
		<Typography variant="body2" align="center" {...props}>
			{'Copyright © '}
			<a href="https://mui.com/">
				Porodično poljoprivredno gazdinstvo Adilović
			</a>
			{` ${new Date().getFullYear()}.`}
		</Typography>
	);
}

const Login = () => {
	const history = useHistory();
	const mongoDB = useAxiosRequest();
	const [error, setError] = useState(null);
	const screen = UserWindow();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const userData = {
			email: data.get('email'),
			password: data.get('password'),
		};
		submitData(userData);
	};

	const submitData = async (userData) => {
		try {
			const loggedIn = await mongoDB.userLogin(userData);
			login(loggedIn.token, loggedIn.user);
			history.push('/materials');
		} catch (err) {
			console.log(err);
			if (err.response) {
				setError(err.response.data.msg);
			} else {
				setError('Network error. Try again later');
			}
		}
	};

	if (isAuthenticated()) {
		history.push('/materials');
	}

	return (
		<Box
			sx={{
				paddingLeft: screen.dynamicWidth < 600 ? 0 : 22,
			}}
		>
			<RootStyle title="Login | BILD-IT Web Training">
				<CssBaseline />
				<Container maxWidth="sm">
					<SectionStyle>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Typography sx={{ px: 5, mt: 3, mb: 3 }}>
								Dobrodošli na stranice porodičnog poljoprivrednog gazdinstva
								Adilović!
							</Typography>
							<Typography variant="h6" sx={{ px: 5, mt: 0, mb: 5 }}>
								<Link
									style={{ color: '#648381' }}
									to="/materials"
									variant="body2"
								>
									{'Ulaz za goste'}
								</Link>
							</Typography>
						</Box>
						<img src={jagodicasto} alt="login" />
					</SectionStyle>
				</Container>
				<Container maxWidth="sm">
					<ContentStyle>
						<Box
							sx={{
								marginTop: 5,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: '#C33C54' }}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Prijava
							</Typography>
							<Box
								component="form"
								onSubmit={handleSubmit}
								noValidate
								sx={{ mt: 1 }}
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
								<TextField
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Prijava za registrovane korisnike
								</Button>
								<Grid container>
									<Grid item xs={12}>
										<Link
											style={{ color: '#648381' }}
											to="/signup"
											variant="body2"
										>
											{'Niste naš registrovan korisnik? Registruj se!'}
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
						<Copyright sx={{ mt: 8, mb: 4 }} />
					</ContentStyle>
				</Container>
			</RootStyle>
		</Box>
	);
};

export default Login;
