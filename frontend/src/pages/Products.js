import React, { useEffect, useState, useRef, useMemo } from 'react';
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
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	let category = localStorage.getItem('category')
		? localStorage.getItem('category')
		: '';
	let PageSize = 6;

	const currentProducts = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		setLoading(false);
		return filteredProducts.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, filteredProducts]); // eslint-disable-line react-hooks/exhaustive-deps

	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};

	const getProducts = async () => {
		const categoryArr = [];
		if (
			category === 'Home' ||
			category === 'Profil' ||
			category === 'Dodaj Sadnice'
		) {
			category = '';
		}

		if (category === 'Ostalo') {
			category = ['Lješnjak', 'Višnja'];
			categoryArr.push(...category);
		} else {
			categoryArr.push(category);
		}

		const products = await productsDB.getAllProducts(
			[''],
			[...categoryArr],
			['']
		);
		const totalPageCount = Math.ceil(products.length / PageSize);
		setCount(totalPageCount);
		setCurrentPage(1);
		setProducts(products);
		setFilteredProducts(products);
		setSelectedFilters('');
		console.log('finished loading', products);
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
		console.log('test in use effect category');
		if (isMounted.current) {
			console.log('test out of use effect category');
			setLoading(true);
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
						setCount={setCount}
						setCurrentPage={setCurrentPage}
						category={category === 'Home' ? '' : category}
						products={products}
						setFilteredProducts={setFilteredProducts}
						isOpenFilter={openFilter}
						onOpenFilter={handleOpenFilter}
						onCloseFilter={handleCloseFilter}
						setSelectedFilters={setSelectedFilters}
						shoppingCart={shoppingCart}
					/>
					{currentProducts.length < 1 && (
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
									Nisu pronađene tražene sadnice
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
							{currentProducts.map((product, index) => (
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
							pb: 4,
						}}
					>
						<Pagination
							size="large"
							page={currentPage}
							count={count}
							onChange={handlePageChange}
						/>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Products;
