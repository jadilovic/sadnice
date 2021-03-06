import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAxiosOrders from '../utils/useAxiosOrders';
import {
	Box,
	Button,
	Card,
	CardContent,
	Typography,
	Divider,
	Grid,
	TextField,
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormControl,
	Alert,
} from '@mui/material';

export const AddressDetails = (props) => {
	const history = useHistory();
	const { setOrderAddress, orderAddress, shoppingCart, totalOrder } = props;
	const [conditions, setConditions] = useState({
		pay: false,
		agree: false,
	});
	const [conditionsError, setConditionsError] = useState(false);
	const [backendError, setBackendError] = useState(false);
	const { pay, agree } = conditions;
	const mongoDB = useAxiosOrders();
	const [fieldErrors, setFieldErrors] = useState({});

	const handleChange = (event) => {
		setOrderAddress({
			...orderAddress,
			[event.target.name]: event.target.value,
		});
	};

	const settingErrors = (errors) => {
		let initialErrors = {
			firstName: { error: false, msg: '' },
			lastName: { error: false, msg: '' },
			city: { error: false, msg: '' },
			phone: { error: false, msg: '' },
			address: { error: false, msg: '' },
			postNumber: { error: false, msg: '' },
			acceptedConditions: { error: false, msg: '' },
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
		if (initialErrors.acceptedConditions.error) {
			setConditionsError(true);
		}
		setFieldErrors(initialErrors);
		initialErrors = {};
		setBackendError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const checkError = [pay, agree].filter((v) => v).length !== 2;
		setConditionsError(false);
		if (checkError) {
			orderAddress.acceptedConditions = '';
		} else {
			orderAddress.acceptedConditions = 'Accepted';
		}
		orderAddress.shoppingCart = shoppingCart;
		orderAddress.totalOrder = totalOrder;
		orderAddress.orderStatus = 'ongoing';
		orderAddress.comment = 'Nema';
		delete orderAddress.email;
		delete orderAddress._id;
		try {
			const order = await mongoDB.createOrder(orderAddress);
			localStorage.setItem('order', JSON.stringify(order));
			localStorage.removeItem('shopping_cart');
			localStorage.removeItem('category');
			localStorage.removeItem('total_order');
			localStorage.removeItem('product_id');
			history.push('/order');
		} catch (err) {
			try {
				if (err.response.data.msg.startsWith('ValidationError: ')) {
					settingErrors(err.response.data.msg);
				} else {
					setFieldErrors({});
					setBackendError(err.response.data.msg);
				}
			} catch (error) {
				console.log('ERROR : ', error);
				setFieldErrors({});
				setBackendError('Network error. Try again later.');
			}
		}
	};

	const conditionsChange = (event) => {
		setConditions({
			...conditions,
			[event.target.name]: event.target.checked,
		});
	};

	return (
		<form onSubmit={handleSubmit} autoComplete="off" noValidate>
			<Card
				sx={{
					marginBottom: 2,
					borderRadius: '12px',
				}}
			>
				<Typography
					style={{ paddingTop: 15, textAlign: 'center' }}
					gutterBottom
					variant="h6"
					component="div"
				>
					Adresa dostave
				</Typography>
				{backendError && (
					<Box
						sx={{
							paddingTop: 2,
							paddingBottom: 2,
							bgcolor: 'background.paper',
						}}
					>
						<Alert severity="error">{backendError}</Alert>
					</Box>
				)}
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={12} xs={12}>
							<TextField
								error={fieldErrors?.firstName?.error ? true : false}
								helperText={fieldErrors?.firstName?.msg}
								fullWidth
								label="Ime"
								name="firstName"
								onChange={handleChange}
								required
								value={orderAddress.firstName}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								error={fieldErrors?.lastName?.error ? true : false}
								helperText={fieldErrors?.lastName?.msg}
								fullWidth
								label="Prezime"
								name="lastName"
								onChange={handleChange}
								required
								value={orderAddress.lastName}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								error={fieldErrors?.address?.error ? true : false}
								helperText={fieldErrors?.address?.msg}
								fullWidth
								label="Adresa"
								name="address"
								onChange={handleChange}
								required
								value={orderAddress.address}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								error={fieldErrors?.city?.error ? true : false}
								helperText={fieldErrors?.city?.msg}
								fullWidth
								label="Grad"
								name="city"
								onChange={handleChange}
								required
								value={orderAddress.city}
								variant="outlined"
							></TextField>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								error={fieldErrors?.postNumber?.error ? true : false}
								helperText={fieldErrors?.postNumber?.msg}
								fullWidth
								label="Po??tanski broj"
								name="postNumber"
								onChange={handleChange}
								required
								value={orderAddress.postNumber}
								variant="outlined"
							></TextField>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								error={fieldErrors?.phone?.error ? true : false}
								helperText={fieldErrors?.phone?.msg}
								fullWidth
								label="Broj telefona"
								name="phone"
								onChange={handleChange}
								required
								value={orderAddress.phone}
								variant="outlined"
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<FormControl
					required
					error={conditionsError}
					component="fieldset"
					sx={{ m: 3 }}
					variant="standard"
				>
					{conditionsError && (
						<FormHelperText component="p">
							Potvrdi prihvatanje uslova kupovine i pla??anja
						</FormHelperText>
					)}
					<FormGroup>
						<FormControlLabel
							sx={{ paddingLeft: 2 }}
							control={
								<Checkbox
									checked={pay}
									onChange={conditionsChange}
									name="pay"
								/>
							}
							label="Pla??anje Pouze??em."
						/>
						<Typography sx={{ paddingLeft: 2, paddingBottom: 2 }}>
							Pla??anje ke??om pri preuzimanju artikla.
						</Typography>
						<Divider />
						<Typography align="justify" sx={{ p: 2 }}>
							Va??i li??ni podaci ??e se koristiti za obradu va??e narud??be, podr??ku
							va??em iskustvu na ovoj veb lokaciji i u druge svrhe opisane u
							pravila o privatnosti.
						</Typography>
						<Divider />
						<FormControlLabel
							sx={{ p: 2 }}
							control={
								<Checkbox
									checked={agree}
									onChange={conditionsChange}
									name="agree"
								/>
							}
							label="Pro??itao/la sam i sla??em se s uslovima kori??tenja i odredbama web stranice."
						/>
					</FormGroup>
					{conditionsError && (
						<FormHelperText component="p">
							Oba kvadrati??a treba markirati
						</FormHelperText>
					)}
				</FormControl>
				<Divider />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						p: 2,
					}}
				>
					<Button type="submit" fullWidth color="success" variant="contained">
						Naru??ite
					</Button>
				</Box>
				<Typography align="justify" sx={{ p: 2 }}>
					Ovim potvr??ujem da su moji kontakt podaci, adresa i kontakt telefon za
					po??iljku ispravni. U slu??aju da sam dao/dala pogre??ne podatke, te
					usljed toga do??e do dodatnih tro??kova isporuke preuzimam dodatne
					tro??kove istih.
				</Typography>
				<Divider />
				<Typography align="justify" sx={{ p: 2 }}>
					Klikom na Naru??ite potvr??ujete Va??u narud??bu, te ??ete biti preba??eni
					na stranicu sa potvrdom Va??e narud??be
				</Typography>
			</Card>
		</form>
	);
};
