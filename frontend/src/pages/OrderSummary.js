import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
	Grid,
	Box,
	Container,
	Card,
	CardContent,
	Paper,
	Stack,
	Chip,
} from '@mui/material';
import UserWindow from '../utils/UserWindow';
import LoadingPage from '../components/LoadingPage';
import useAxiosProducts from '../utils/useAxiosProducts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const OrderSummary = () => {
	const productsDB = useAxiosProducts();
	const screen = UserWindow();
	const [loading, setLoading] = useState(true);
	const [order, setOrder] = useState({});
	const [products, setProducts] = useState([]);
	const [shoppingCart, setShoppingCart] = useState([]);
	const [totalOrder, setTotalOrder] = useState(0);

	const getProducts = async () => {
		const products = await productsDB.getAllProducts([], []);
		console.log(products);
		setProducts(products);
		setLoading(false);
	};

	useEffect(() => {
		const localStorageOrder = JSON.parse(localStorage.getItem('order'));
		setOrder(localStorageOrder);
		setShoppingCart(localStorageOrder.shoppingCart);
		setTotalOrder(Number(localStorageOrder.totalOrder));
		getProducts();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getProductObject = (productId) => {
		return products.find((product) => product._id === productId);
	};

	console.log(loading);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<Box
			sx={{
				flexGrow: 1,
				paddingTop: 9,
				paddingLeft: screen.dynamicWidth < 600 ? 0 : 22,
				paddingRight: 0,
				width: '100%',
			}}
		>
			<Container component="main" maxWidth="md">
				<Stack spacing={1} alignItems="center" paddingBottom={2}>
					<Chip
						style={{ minWidth: 300, minHeight: 40, fontSize: 19 }}
						size="medium"
						label={`Vaša narudžba broj: ${order.orderNumber}`}
						color="primary"
					/>
				</Stack>
				<TableContainer component={Paper}>
					<Table aria-label="spanning table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Grupa</TableCell>
								<TableCell align="left">Naziv</TableCell>
								<TableCell align="center">Cijena</TableCell>
								<TableCell align="center">Količina</TableCell>
								<TableCell align="center">Ukupno</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{shoppingCart.map((product, index) => {
								const productDetails = getProductObject(product.id);
								return (
									<TableRow key={index}>
										<TableCell align="left">
											{productDetails.category}
										</TableCell>

										<TableCell align="left">{productDetails.title}</TableCell>
										<TableCell align="right">
											{productDetails.price} KM
										</TableCell>
										<TableCell align="right">
											<Box m="auto">{product.amount}</Box>
										</TableCell>
										<TableCell align="right">
											{`${product.amount * productDetails.price} KM`}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Ukupno sadnice:</TableCell>
								<TableCell align="right">{`${totalOrder} KM`}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Standardna dostava brzom poštom:</TableCell>
								<TableCell align="right">{`10 KM`}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Ukupno:</TableCell>
								<TableCell align="right">{`${totalOrder + 10} KM`}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6}>
						<Card sx={{ marginTop: 1 }}>
							<CardContent>
								<Typography gutterBottom variant="body1" component="div">
									Adresa dostave
								</Typography>
								<Typography variant="body2">
									{`${order.firstName} ${order.lastName}`}
								</Typography>
								<Typography variant="body2">{`${order.address}`}</Typography>
								<Typography variant="body2">
									{`${order.postNumber} ${order.city}`}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card sx={{ marginTop: 1 }}>
							<CardContent>
								<Typography gutterBottom variant="body1" component="div">
									{`Broj narudžbe: ${order.orderNumber}`}
								</Typography>
								<Typography variant="body2">{order.firstName}</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default OrderSummary;
