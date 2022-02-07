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
} from '@mui/material';

export const AddressDetails = (props) => {
	//	const [values, setValues] = useState(props.orderAddress);
	const history = useHistory();
	const { setOrderAddress, orderAddress, shoppingCart, totalOrder } = props;
	const [conditions, setConditions] = useState({
		pay: false,
		agree: false,
	});
	const [error, setError] = useState(false);
	const { pay, agree } = conditions;
	const mongoDB = useAxiosOrders();

	const handleChange = (event) => {
		setOrderAddress({
			...orderAddress,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const checkError = [pay, agree].filter((v) => v).length !== 2;
		if (checkError) {
			setError(true);
		} else {
			setError(false);
			orderAddress.shoppingCart = shoppingCart;
			orderAddress.totalOrder = totalOrder;
			orderAddress.orderStatus = 'ongoing';
			delete orderAddress.email;
			delete orderAddress._id;
			// check if isActive false
			console.log('data : ', orderAddress);
			try {
				const order = await mongoDB.createOrder(orderAddress);
				//	setOrderAddress({});
				console.log(order);
				localStorage.setItem('order', JSON.stringify(order));
				localStorage.removeItem('shopping_cart');
				localStorage.removeItem('category');
				localStorage.removeItem('total_order');
				localStorage.removeItem('product_id');
				history.push('/order');
			} catch (err) {
				console.log(err.response);
				//	setError(err.response.data.msg);
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
		<form onSubmit={handleSubmit} autoComplete="off">
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
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={12} xs={12}>
							<TextField
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
								fullWidth
								label="Address"
								name="address"
								onChange={handleChange}
								required
								value={orderAddress.address}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								fullWidth
								label="City"
								name="city"
								onChange={handleChange}
								required
								value={orderAddress.city}
								variant="outlined"
							></TextField>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								fullWidth
								label="Post Number"
								name="postNumber"
								onChange={handleChange}
								required
								value={orderAddress.postNumber}
								variant="outlined"
							></TextField>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								fullWidth
								label="Phone Number"
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
					error={error}
					component="fieldset"
					sx={{ m: 3 }}
					variant="standard"
				>
					{error && (
						<FormHelperText component="legend">
							Potvrdi prihvatanje uslova kupovine i plaćanja
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
							label="Plaćanje Pouzećem."
						/>
						<Typography sx={{ paddingLeft: 2, paddingBottom: 2 }}>
							Plaćanje kešom pri preuzimanju artikla.
						</Typography>
						<Divider />
						<Typography align="justify" sx={{ p: 2 }}>
							Vaši lični podaci će se koristiti za obradu vaše narudžbe, podršku
							vašem iskustvu na ovoj veb lokaciji i u druge svrhe opisane u
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
							label="Pročitao/la sam i slažem se s uslovima korištenja i odredbama web stranice."
						/>
					</FormGroup>
					{error && (
						<FormHelperText component="legend">
							Oba kvadratića treba markirati
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
						Naručite
					</Button>
				</Box>
				<Typography align="justify" sx={{ p: 2 }}>
					Ovim potvrđujem da su moji kontakt podaci, adresa i kontakt telefon za
					pošiljku ispravni. U slučaju da sam dao/dala pogrešne podatke, te
					usljed toga dođe do dodatnih troškova isporuke preuzimam dodatne
					troškove istih.
				</Typography>
				<Divider />
				<Typography align="justify" sx={{ p: 2 }}>
					Klikom na Naručite potvrđujete Vašu narudžbu, te ćete biti prebačeni
					na stranicu sa potvrdom Vaše narudžbe
				</Typography>
			</Card>
		</form>
	);
};
