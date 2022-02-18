import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Stack, Chip } from '@mui/material';
import { OrderItem } from '../components/OrderItem';
import { AddressDetails } from '../components/AddressDetails';
import UserWindow from '../utils/UserWindow';
import TotalOrder from '../components/TotalOrder';
import LoadingPage from '../components/LoadingPage';
import { useHistory } from 'react-router-dom';
import useAxiosRequest from '../utils/useAxiosRequest';

const Address = () => {
	const screen = UserWindow();
	const [totalOrder, setTotalOrder] = useState(0);
	const [shoppingCart, setShoppingCart] = useState([]);
	const [orderAddress, setOrderAddress] = useState({
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		postNumber: '',
		phone: '',
		email: '',
	});
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	const userDB = useAxiosRequest();

	const getCurrentUserData = async (userId) => {
		const data = await userDB.getUser(userId);
		setOrderAddress({ ...orderAddress, ...data.user });
		setLoading(false);
	};

	useEffect(() => {
		const localStorageShoppingCart = JSON.parse(
			localStorage.getItem('shopping_cart')
		);
		if (localStorageShoppingCart) {
			setShoppingCart(localStorageShoppingCart);
			setTotalOrder(Number(localStorage.getItem('total_order')));
			const localStorageUser = JSON.parse(localStorage.getItem('user'));
			getCurrentUserData(localStorageUser._id);
		} else {
			history.push('/products');
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (loading) {
		return <LoadingPage />;
	}

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
						{shoppingCart.map((item, index) => {
							return <OrderItem key={index} item={item} />;
						})}
						<TotalOrder totalOrder={totalOrder} />
					</Grid>
					<Grid item lg={6} md={6} xs={12}>
						<AddressDetails
							orderAddress={orderAddress}
							setOrderAddress={setOrderAddress}
							shoppingCart={shoppingCart}
							totalOrder={totalOrder}
						/>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Address;
