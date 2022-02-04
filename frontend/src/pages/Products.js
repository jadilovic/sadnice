import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination } from '@mui/material';
// import products from '../data/products';
import MaterialsListToolbar from '../components/Materials-list-toolbar';
import MaterialCard from '../components/MaterialCard';
import UserWindow from '../utils/UserWindow';
import useAxiosProducts from '../utils/useAxiosProducts';
import LoadingPage from '../components/LoadingPage';

const Products = () => {
	const screen = UserWindow();
	const [shoppingCart, setShoppingCart] = useState([]);
	const [products, setProducts] = useState([]);
	const productsDB = useAxiosProducts();
	const [loading, setLoading] = useState(true);
	let category = localStorage.getItem('category')
		? localStorage.getItem('category')
		: '';
	let age = localStorage.getItem('age') ? localStorage.getItem('age') : '';

	const getProducts = async (age, category) => {
		const products = await productsDB.getAllProducts([age], [category]);
		setProducts(products);
		localStorage.removeItem('category');
		setLoading(false);
		console.log('finished loading', category);
	};

	useEffect(() => {
		const currentShoppingCart = JSON.parse(
			localStorage.getItem('shopping_cart')
		);
		if (currentShoppingCart) {
			setShoppingCart(currentShoppingCart);
		}
		getProducts(age, category);
	}, []);

	useEffect(() => {
		if (category === 'Home') {
			category = '';
		}
		getProducts(age, category);
	}, [category]);

	console.log(age, category, products);

	if (loading) {
		return <LoadingPage />;
	}
	return (
		<>
			<title>Products | Material Kit</title>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					paddingTop: 9,
					paddingLeft: screen.dynamicWidth < 600 ? 0 : 22,
				}}
			>
				<Container maxWidth={false}>
					<MaterialsListToolbar shoppingCart={shoppingCart} />
					<Box sx={{ pt: 3 }}>
						<Grid container spacing={3}>
							{products.map((product, index) => (
								<Grid item key={index} lg={3} md={6} xs={12}>
									<MaterialCard
										product={product}
										//	shoppingCart={shoppingCart}
										//	setShoppingCart={setShoppingCart}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							pt: 3,
						}}
					>
						<Pagination color="primary" count={3} size="small" />
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Products;
