import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {
	Grid,
	Box,
	Container,
	Card,
	CardHeader,
	CardContent,
	Paper,
	IconButton,
	Stack,
	Chip,
} from '@mui/material';
import UserWindow from '../utils/UserWindow';
import LoadingPage from '../components/LoadingPage';
import useAxiosProducts from '../utils/useAxiosProducts';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TotalOrder from '../components/TotalOrder';

const products = [
	{
		name: 'Product 1',
		desc: 'A nice thing',
		price: '$9.99',
	},
	{
		name: 'Product 2',
		desc: 'Another thing',
		price: '$3.45',
	},
	{
		name: 'Product 3',
		desc: 'Something else',
		price: '$6.51',
	},
	{
		name: 'Product 4',
		desc: 'Best thing of all',
		price: '$14.11',
	},
	{ name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
	{ name: 'Card type', detail: 'Visa' },
	{ name: 'Card holder', detail: 'Mr John Smith' },
	{ name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
	{ name: 'Expiry date', detail: '04/2024' },
];

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
	}, []);

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
