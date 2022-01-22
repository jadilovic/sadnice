import { useState } from 'react';
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
	FormGroup,
	FormControlLabel,
} from '@mui/material';
import { breakpoints } from '@mui/system';

export const AddressDetails = (props) => {
	//	const [values, setValues] = useState(props.orderAddress);
	const { setOrderAddress, orderAddress } = props;

	const handleChange = (event) => {
		setOrderAddress({
			...orderAddress,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(orderAddress);
	};

	const [checked, setChecked] = useState(false);

	const checkedChange = (event) => {
		setChecked(event.target.checked);
	};

	console.log(props.userAddress);
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
								label="Email Address"
								name="email"
								onChange={handleChange}
								value={orderAddress.email}
								variant="outlined"
							/>
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
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-start',
						p: 2,
					}}
				>
					<FormControlLabel
						control={
							<Checkbox
								checked={checked}
								onChange={checkedChange}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						label="Plaćanje Pouzećem."
					/>
				</Box>
				<Typography sx={{ paddingLeft: 2, paddingBottom: 2 }}>
					Plaćanje kešom pri preuzimanju artikla.
				</Typography>
				<Divider />
				<Typography sx={{ p: 2 }}>
					Vaši lični podaci će se koristiti za obradu vaše narudžbe, podršku
					vašem iskustvu na ovoj veb lokaciji i u druge svrhe opisane u pravila
					o privatnosti.
				</Typography>
				<Divider />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-start',
						p: 2,
					}}
				>
					<FormControlLabel
						control={
							<Checkbox
								checked={checked}
								onChange={checkedChange}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						label="Pročitao/la sam i slažem se s uslovima korištenja i odredbama web stranice."
					/>
				</Box>
				<Divider />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						p: 2,
					}}
				>
					<Button type="submit" fullWidth color="success" variant="contained">
						Potvrdi narudžbu i adresu
					</Button>
				</Box>
			</Card>
		</form>
	);
};
