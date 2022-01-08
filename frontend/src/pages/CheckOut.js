import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAxiosProducts from '../utils/useAxiosProducts';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ButtonGroup, Button } from '@mui/material';
import { IconButton, Chip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EmptyCart from '../pages/EmptyCart';
import UserWindow from '../utils/UserWindow';
// import products from '../data/products';
import DeleteIcon from '@mui/icons-material/Delete';
import TotalOrder from '../components/TotalOrder';
import LoadingPage from '../components/LoadingPage';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TAX_RATE = 0.07;

function ccyFormat(num) {
	return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
	return qty * unit;
}

function createRow(desc, qty, unit) {
	const price = priceRow(qty, unit);
	return { desc, qty, unit, price };
}

function subtotal(items) {
	return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
	createRow('Paperclips (Box)', 100, 1.15),
	createRow('Paper (Case)', 10, 45.99),
	createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	width: '100%',
	textAlign: 'center',
	color: theme.palette.text.secondary,
	paddingTop: 18,
}));

const CheckOut = () => {
	const productsDB = useAxiosProducts();
	const [products, setProducts] = useState([]);
	const [shoppingCart, setShoppingCart] = useState([]);
	const [totalOrder, setTotalOrder] = useState(0);
	const screen = UserWindow();
	const history = useHistory();

	const calculateTotal = (cart) => {
		console.log(products);
		const totalPrice = cart.reduce((total, item) => {
			return total + item.amount * getProductObject(item.id).price;
		}, 0);
		setTotalOrder(totalPrice);
		localStorage.setItem('total_order', JSON.stringify(totalPrice));
		console.log(totalPrice);
	};

	const getProducts = async () => {
		const products = await productsDB.getAllProducts([], []);
		setProducts(products);
	};

	useEffect(() => {
		if (products.length > 0) {
			calculateTotal(shoppingCart);
		}
	}, [shoppingCart, products]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const localStorageShoppingCart = JSON.parse(
			localStorage.getItem('shopping_cart')
		);
		localStorageShoppingCart && setShoppingCart(localStorageShoppingCart);
		getProducts();
	}, []);

	const getProductObject = (productId) => {
		return products.find((product) => product._id === productId);
	};

	const increase = (index) => {
		const currentAmount = shoppingCart[index].amount;
		shoppingCart[index].amount = currentAmount + 1;
		setShoppingCart([...shoppingCart]);
		localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart));
	};

	const decrease = (index) => {
		if (shoppingCart[index].amount > 0) {
			const currentAmount = shoppingCart[index].amount;
			shoppingCart[index].amount = currentAmount - 1;
			setShoppingCart([...shoppingCart]);
			localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart));
		}
		if (shoppingCart[index].amount === 0) {
			removeItem(index);
		}
	};

	const removeItem = (itemIndex) => {
		shoppingCart.splice(itemIndex, 1);
		setShoppingCart([...shoppingCart]);
		localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart));
	};

	console.log(shoppingCart);

	if (products.length < 1) {
		return <LoadingPage />;
	}

	if (!shoppingCart || shoppingCart?.length < 1) {
		return <EmptyCart />;
	}

	return (
		<Box
			sx={{
				flexGrow: 1,
				paddingTop: 10,
				paddingLeft: screen.dynamicWidth < 600 ? 1 : 24,
				paddingRight: 1,
			}}
		>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="spanning table">
					<TableHead>
						<TableRow>
							<TableCell align="center" colSpan={3}>
								Details
							</TableCell>
							<TableCell align="right">Price</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Desc</TableCell>
							<TableCell align="right">Qty.</TableCell>
							<TableCell align="right">Unit</TableCell>
							<TableCell align="right">Sum</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.desc}>
								<TableCell>{row.desc}</TableCell>
								<TableCell align="right">{row.qty}</TableCell>
								<TableCell align="right">{row.unit}</TableCell>
								<TableCell align="right">{ccyFormat(row.price)}</TableCell>
							</TableRow>
						))}

						<TableRow>
							<TableCell rowSpan={3} />
							<TableCell colSpan={2}>Subtotal</TableCell>
							<TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Tax</TableCell>
							<TableCell align="right">{`${(TAX_RATE * 100).toFixed(
								0
							)} %`}</TableCell>
							<TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Stack spacing={1} alignItems="center" paddingBottom={2}>
				<Chip
					style={{ minWidth: 300, minHeight: 40, fontSize: 19 }}
					size="medium"
					label="Your shopping cart"
					color="default"
				/>
			</Stack>
			{screen.dynamicWidth > 900 && (
				<Stack direction="row" paddingBottom={2}>
					<Item style={{ maxWidth: 90 }}>
						<Typography align="left" color="textPrimary" variant="body1">
							Remove
						</Typography>
					</Item>
					<Item style={{ maxWidth: 120 }}>
						<Typography align="center" color="textPrimary" variant="body1">
							Photo
						</Typography>
					</Item>
					<Item>
						<Typography align="left" color="textPrimary" variant="body1">
							Product
						</Typography>
					</Item>
					<Item>
						<Typography align="left" color="textPrimary" variant="body1">
							Price
						</Typography>
					</Item>
					<Item>
						<Typography align="left" color="textPrimary" variant="body1">
							Amount
						</Typography>
					</Item>
					<Item>
						<Typography align="left" color="textPrimary" variant="body1">
							Total
						</Typography>
					</Item>
				</Stack>
			)}
			{screen.dynamicWidth > 900 &&
				shoppingCart.map((product, index) => {
					const productDetails = getProductObject(product.id);
					return (
						<Stack direction="row" paddingBottom={2} key={index}>
							<Item style={{ paddingTop: 25, maxWidth: 90 }}>
								<IconButton
									onClick={() => removeItem(index)}
									size="small"
									color="secondary"
									aria-label="delete"
								>
									<DeleteIcon />
								</IconButton>
							</Item>
							<Item style={{ paddingTop: 15, maxWidth: 120 }}>
								<Box
									component="img"
									sx={{
										minHeight: 60,
										maxHeight: 60,
										width: '70%',
									}}
									alt="The house from the offer."
									src={`${productDetails.imageUrl}`}
									//	src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
								/>
							</Item>
							<Item>
								<Typography
									paddingTop={1}
									align="left"
									color="textPrimary"
									variant="body1"
								>
									{productDetails.title}
								</Typography>
							</Item>
							<Item>
								<Typography
									paddingTop={1}
									align="center"
									color="textPrimary"
									variant="body1"
								>
									{productDetails.price} KM
								</Typography>
							</Item>
							<Item style={{ paddingTop: 22 }}>
								<ButtonGroup variant="contained">
									<Button onClick={() => decrease(index)}>-</Button>
									<Box m="auto">
										<Typography
											align="center"
											color="textPrimary"
											variant="body1"
										>
											{product.amount}
										</Typography>
									</Box>
									<Button onClick={() => increase(index)}>+</Button>
								</ButtonGroup>
							</Item>
							<Item>
								<Typography
									paddingTop={1}
									align="center"
									color="textPrimary"
									variant="body1"
								>
									{`${product.amount * productDetails.price} KM`}
								</Typography>
							</Item>
						</Stack>
					);
				})}
			{screen.dynamicWidth <= 900 &&
				shoppingCart.map((product, index) => {
					const productDetails = getProductObject(product.id);
					return (
						<Box key={index} paddingBottom={2}>
							<Stack direction="row">
								<Item>
									<Typography align="left" color="textPrimary" variant="body1">
										Remove:
									</Typography>
								</Item>
								<Item style={{ maxWidth: 90 }}>
									<IconButton
										onClick={() => removeItem(index)}
										size="small"
										color="secondary"
										aria-label="delete"
									>
										<DeleteIcon />
									</IconButton>
								</Item>
								<Item style={{ paddingTop: 6 }}>
									<Box
										component="img"
										sx={{
											height: 100,
											width: 150,
										}}
										alt="The house from the offer."
										src={`${productDetails.imageUrl}`}
										// src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
									/>
								</Item>
							</Stack>
							<Stack direction="row">
								<Item>
									<Typography align="left" color="textPrimary" variant="body1">
										Product:
									</Typography>
								</Item>
								<Item>
									<Typography
										align="center"
										color="textPrimary"
										variant="body1"
									>
										{productDetails.title}
									</Typography>
								</Item>
							</Stack>
							<Stack direction="row">
								<Item>
									<Typography align="left" color="textPrimary" variant="body1">
										Price:
									</Typography>
								</Item>
								<Item>
									<Typography
										align="center"
										color="textPrimary"
										variant="body1"
									>
										{productDetails.price}
									</Typography>
								</Item>
							</Stack>
							<Stack direction="row">
								<Item>
									<Typography align="left" color="textPrimary" variant="body1">
										Amount:
									</Typography>
								</Item>
								<Item>
									<ButtonGroup variant="contained">
										<Button onClick={() => decrease(index)}>-</Button>
										<Box m="auto">
											<Typography
												align="center"
												color="textPrimary"
												variant="body1"
											>
												{product.amount}
											</Typography>
										</Box>
										<Button onClick={() => increase(index)}>+</Button>
									</ButtonGroup>
								</Item>
							</Stack>
							<Stack direction="row">
								<Item>
									<Typography align="left" color="textPrimary" variant="body1">
										Total:
									</Typography>
								</Item>
								<Item>
									<Typography
										align="center"
										color="textPrimary"
										variant="body1"
									>{`${product.amount * productDetails.price}`}</Typography>
								</Item>
							</Stack>
						</Box>
					);
				})}
			<Grid container spacing={2}>
				{screen.dynamicWidth > 900 && (
					<Grid item xs={12} sm={12} md={6}>
						<Item>
							<Button
								onClick={() => history.push('/materials')}
								variant="contained"
								color="warning"
							>
								Continue shopping
							</Button>
						</Item>
					</Grid>
				)}
				<Grid item xs={12} sm={12} md={6}>
					<TotalOrder totalOrder={totalOrder} />
					<Button
						onClick={() => history.push('/address')}
						fullWidth
						variant="contained"
						color="success"
					>
						Confirm purchase and add shipping address
					</Button>
				</Grid>
				{screen.dynamicWidth <= 900 && (
					<Grid item xs={12} sm={12} md={6}>
						<Item>
							<Button
								onClick={() => history.push('/materials')}
								variant="contained"
								color="warning"
							>
								Continue shopping
							</Button>
						</Item>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};

export default CheckOut;
