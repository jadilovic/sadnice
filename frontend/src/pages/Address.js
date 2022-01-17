import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Stack, Chip } from '@mui/material';
import { AddressOrder } from '../components/AddressOrder';
import { AddressDetails } from '../components/AddressDetails';
import UserWindow from '../utils/UserWindow';
import TotalOrder from '../components/TotalOrder';
import LoadingPage from '../components/LoadingPage';

const Address = () => {
	const screen = UserWindow();
	const [totalOrder, setTotalOrder] = useState(0);
	const [shoppingCart, setShoppingCart] = useState([]);
	const [userAddress, setUserAddress] = useState({
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		postNumber: '',
		phone: '',
		email: '',
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const localStorageShoppingCart = JSON.parse(
			localStorage.getItem('shopping_cart')
		);
		setShoppingCart(localStorageShoppingCart);
		const localStorageUser = JSON.parse(localStorage.getItem('user'));
		if (!localStorageUser) {
			setUserAddress({ ...userAddress, ...localStorageUser });
		} else {
			setUserAddress({ ...userAddress, ...localStorageUser });
		}
		setTotalOrder(Number(localStorage.getItem('total_order')));
		setLoading(false);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (loading) {
		return <LoadingPage />;
	}

	console.log(shoppingCart);
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				paddingTop: 9,
				paddingLeft: screen.dynamicWidth < 600 ? 0 : 22,
				paddingRight: 0,
			}}
		>
			<Container maxWidth="lg">
				<Stack alignItems="center" paddingBottom={2}>
					<Chip
						style={{ minWidth: 300, minHeight: 40, fontSize: 19 }}
						size="medium"
						label="Zaključite vašu narudžbu"
						color="primary"
					/>
				</Stack>
				<Grid container>
					<Grid item lg={6} md={6} xs={12}>
						<AddressDetails
							userAddress={userAddress}
							setUserAddress={setUserAddress}
						/>
					</Grid>
					<Grid item lg={6} md={6} xs={12}>
						<TotalOrder totalOrder={totalOrder} />
						{shoppingCart.map((item, index) => {
							return <AddressOrder key={index} item={item} />;
						})}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Address;
