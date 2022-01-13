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
} from '@mui/material';

export const AddressDetails = (props) => {
	const [values, setValues] = useState(props.userAddress);

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(values);
	};

	console.log(props.userAddress);
	return (
		<form onSubmit={handleSubmit} autoComplete="off">
			<Card>
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
								value={values.firstName}
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
								value={values.lastName}
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
								value={values.address}
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
								value={values.city}
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
								value={values.postNumber}
								variant="outlined"
							></TextField>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								fullWidth
								label="Email Address"
								name="email"
								onChange={handleChange}
								required
								value={values.email}
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
								value={values.phone}
								variant="outlined"
							/>
						</Grid>
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
					<Button type="submit" fullWidth color="success" variant="contained">
						Confirm purchase and shipping address
					</Button>
				</Box>
			</Card>
		</form>
	);
};
