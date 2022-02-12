import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/bs';
import { getUserData, isAuthenticated } from '../auth/Authentication';
import { useHistory } from 'react-router-dom';
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
	Button,
	TextField,
	Select,
	MenuItem,
} from '@mui/material';
import UserWindow from '../utils/UserWindow';
import LoadingPage from '../components/LoadingPage';
import useAxiosProducts from '../utils/useAxiosProducts';
import useAxiosOrders from '../utils/useAxiosOrders';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import statuses from '../data/statuses';

const OrderSummary = React.forwardRef((props, ref) => {
	const productsDB = useAxiosProducts();
	const ordersDB = useAxiosOrders();
	const screen = UserWindow();
	const [loading, setLoading] = useState(true);
	const [order, setOrder] = useState({});
	const [products, setProducts] = useState([]);
	const [shoppingCart, setShoppingCart] = useState([]);
	const [totalOrder, setTotalOrder] = useState(0);
	const [error, setError] = useState(null);
	const [comment, setComment] = useState('');
	const [orderStatus, setOrderStatus] = useState('');
	const [admin, setAdmin] = useState(false);
	const history = useHistory();

	moment.locale('bs');

	const getProducts = async () => {
		const products = await productsDB.getAllProducts([], [], []);
		setProducts(products);
	};

	useEffect(() => {
		console.log('useEffect test on products ');
		setComment(order.comment);
		setOrderStatus(order.orderStatus);
		setLoading(false);
	}, [products]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setLoading(true);
		const localStorageOrder = JSON.parse(localStorage.getItem('order'));
		const user = getUserData();
		if (isAuthenticated()) {
			if (user.role === 'admin') {
				setAdmin(true);
			}
		}
		setOrder(localStorageOrder);
		setShoppingCart(localStorageOrder.shoppingCart);
		setTotalOrder(Number(localStorageOrder.totalOrder));
		getProducts();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getProductObject = (productId) => {
		return products.find((product) => product._id === productId);
	};

	const handleChange = (event) => {
		event.preventDefault();
		setComment(event.target.value);
	};

	const submitData = async (e) => {
		e.preventDefault();
		try {
			const updatedOrder = await ordersDB.updateOrder(
				order._id,
				comment,
				orderStatus
			);
			console.log(updatedOrder);
			history.push('/orders');
		} catch (err) {
			console.log(err);
			if (err.response) {
				setError(err.response.data.msg.split('-').pop());
			} else {
				setError('Network error. Pokušajte ponovo kasnije.');
			}
		}
	};

	const handleOrderStatusChange = (event) => {
		event.preventDefault();
		setOrderStatus(event.target.value);
		//	setChangeBicycleStatus(!changeBicycleStatus);
	};

	const getStatusColor = () => {
		const statusObject = statuses.find((status) => orderStatus === status.name);
		return statusObject.color;
	};

	console.log(comment);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<Box
			sx={{
				flexGrow: 1,
				paddingTop: 8,
				paddingLeft: screen.dynamicWidth < 600 ? 0 : 22,
				paddingRight: 0,
				width: '100%',
			}}
		>
			<Container component="main" maxWidth="md" ref={ref}>
				<Stack spacing={1} alignItems="center" paddingTop={2} paddingBottom={2}>
					<Chip
						style={{
							minWidth: 300,
							minHeight: 40,
							fontSize: 19,
						}}
						size="medium"
						label={`Narudžba sadnica broj: ${order.orderNumber}`}
						color="primary"
					/>
				</Stack>
				<TableContainer component={Paper}>
					<Table aria-label="spanning table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Sadnice</TableCell>
								<TableCell align="center">Cijena</TableCell>
								<TableCell align="center">Količina</TableCell>
								<TableCell align="right">Ukupno</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{shoppingCart.map((product, index) => {
								const productDetails = getProductObject(product.id);
								return (
									<TableRow key={index}>
										<TableCell align="left">
											{productDetails.category} {productDetails.title}
										</TableCell>
										<TableCell align="center">
											{productDetails.price} KM
										</TableCell>
										<TableCell align="center">
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
								<Typography
									style={{ textDecorationLine: 'underline' }}
									gutterBottom
									variant="body1"
									component="div"
								>
									Adresa dostave
								</Typography>
								<Typography variant="body1">
									{`${order.firstName} ${order.lastName}`}
								</Typography>
								<Typography variant="body1">{`${order.address}`}</Typography>
								<Typography variant="body1">
									{`${order.postNumber} ${order.city}`}
								</Typography>
								<Typography paddingTop={1} variant="body1">
									{`Telefon: ${order.phone}`}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card sx={{ marginTop: 1 }}>
							<CardContent>
								<Typography
									style={{ textDecorationLine: 'underline' }}
									gutterBottom
									variant="body1"
									component="div"
								>
									{`Broj narudžbe: ${order.orderNumber}`}
								</Typography>
								<Typography variant="body1">
									{`Datum narudžbe: ${moment(order.createdAt).format('lll')}`}
								</Typography>
								<Typography variant="body1">
									{`Datum zadnje izmjene: ${moment(order.updatedAt).format(
										'lll'
									)}`}
								</Typography>
								<Stack padding={1} direction="row" spacing={1}>
									<Typography variant="body1">Status: </Typography>
									<Select
										readOnly={!admin}
										size="small"
										variant="outlined"
										style={{ width: 165 }}
										value={orderStatus}
										onChange={handleOrderStatusChange}
										sx={{
											backgroundColor: getStatusColor(orderStatus),
											alignSelf: 'center',
										}}
									>
										{statuses.map((status, index) => {
											return (
												<MenuItem
													sx={{
														backgroundColor: `${status.color}`,
													}}
													key={index}
													value={status.name}
												>
													{` ${status.title}`}
												</MenuItem>
											);
										})}
									</Select>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card>
							<CardContent>
								<form autoComplete="off" noValidate onSubmit={submitData}>
									<TextField
										InputProps={{
											readOnly: !admin,
										}}
										margin="normal"
										required
										fullWidth
										multiline
										minRows={4}
										name="comment"
										label="Komentar"
										id="comment"
										error={error ? true : false}
										helperText={error}
										value={comment}
										onChange={handleChange}
									/>
									{admin && (
										<Button type="submit" variant="contained">
											Dodaj novi status / komentar
										</Button>
									)}
								</form>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
});

export default OrderSummary;
