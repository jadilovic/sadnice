import React, { useEffect, useState, useRef } from 'react';
import {
	Box,
	Container,
	Grid,
	Pagination,
	Paper,
	Typography,
} from '@mui/material';
// import products from '../data/products';
import ProductsToolbar from '../components/ProductsToolbar';
import ProductCard from '../components/ProductCard';
import UserWindow from '../utils/UserWindow';
import useAxiosProducts from '../utils/useAxiosProducts';
import LoadingPage from '../components/LoadingPage';

const Products = () => {
	const screen = UserWindow();
	const isMounted = useRef(false);
	const [shoppingCart, setShoppingCart] = useState([]);
	const [products, setProducts] = useState([]);
	const productsDB = useAxiosProducts();
	const [loading, setLoading] = useState(true);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState('');
	const [openFilter, setOpenFilter] = useState(false);
	let category = localStorage.getItem('category')
		? localStorage.getItem('category')
		: '';

	const getProducts = async () => {
		if (category === 'Home') {
			category = '';
		}
		const products = await productsDB.getAllProducts([''], [category], ['']);
		setProducts(products);
		setFilteredProducts(products);
		setSelectedFilters('');
		setLoading(false);
		console.log('finished loading', category);
	};

	useEffect(() => {
		setLoading(true);
		const currentShoppingCart = JSON.parse(
			localStorage.getItem('shopping_cart')
		);
		if (currentShoppingCart) {
			setShoppingCart(currentShoppingCart);
		}
		getProducts();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (isMounted.current) {
			setLoading(true);
			console.log('category use effect : ', category);
			getProducts();
		} else {
			isMounted.current = true;
		}
	}, [category]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleOpenFilter = () => {
		setOpenFilter(true);
	};

	const handleCloseFilter = () => {
		setOpenFilter(false);
	};

	console.log(category);

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
					<ProductsToolbar
						category={category === 'Home' ? '' : category}
						products={products}
						setFilteredProducts={setFilteredProducts}
						isOpenFilter={openFilter}
						onOpenFilter={handleOpenFilter}
						onCloseFilter={handleCloseFilter}
						setSelectedFilters={setSelectedFilters}
						shoppingCart={shoppingCart}
					/>
					{filteredProducts.length < 1 && (
						<Grid item xs={12} sm={12} lg={12}>
							<Paper
								component="form"
								style={{
									justifyContent: 'center',
								}}
								sx={{
									display: 'flex',
									alignItems: 'center',
									width: '100%',
								}}
							>
								<Typography variant="p">
									Nisu pronadjene trazene sadnice
								</Typography>
							</Paper>
						</Grid>
					)}
					{selectedFilters && (
						<Grid item xs={12} sm={12} lg={12}>
							<Paper
								component="form"
								style={{
									justifyContent: 'center',
								}}
								sx={{
									display: 'flex',
									alignItems: 'center',
									width: '100%',
								}}
							>
								<Typography variant="p">{`${selectedFilters}`}</Typography>
							</Paper>
						</Grid>
					)}
					<Box sx={{ pt: 3 }}>
						<Grid container spacing={3}>
							{filteredProducts.map((product, index) => (
								<Grid item key={index} lg={4} md={6} xs={12}>
									<ProductCard product={product} />
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
