import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAxiosProducts from '../utils/useAxiosProducts';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ButtonGroup, Button } from '@mui/material';
import { IconButton, Chip } from '@mui/material';
import { Paper, Card, CardMedia, CardContent } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EmptyCart from '../pages/EmptyCart';
import UserWindow from '../utils/UserWindow';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingPage from '../components/LoadingPage';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TotalOrder from '../components/TotalOrder';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	width: '100%',
	textAlign: 'center',
	color: theme.palette.text.secondary,
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
				paddingTop: 9,
				paddingLeft: screen.dynamicWidth < 600 ? 2 : 24,
				paddingRight: 2,
			}}
		>
			<Stack spacing={1} alignItems="center" paddingBottom={2}>
				<Chip
					style={{ minWidth: 300, minHeight: 40, fontSize: 19 }}
					size="medium"
					label="Vaša korpa sadnica"
					color="primary"
				/>
			</Stack>
			{screen.dynamicWidth > 900 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 600 }} aria-label="spanning table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Obriši</TableCell>
								<TableCell align="center">Slika</TableCell>
								<TableCell align="left">Naziv</TableCell>
								<TableCell align="center">Cijena</TableCell>
								<TableCell align="center">Količina</TableCell>
								<TableCell align="left">Ukupno</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{shoppingCart.map((product, index) => {
								const productDetails = getProductObject(product.id);
								return (
									<TableRow key={index}>
										<TableCell align="center">
											<IconButton
												onClick={() => removeItem(index)}
												size="small"
												color="secondary"
												aria-label="delete"
											>
												<DeleteIcon />
											</IconButton>
										</TableCell>
										<TableCell align="center">
											<Box
												component="img"
												sx={{
													minHeight: 60,
													maxHeight: 60,
													width: '70%',
													maxWidth: 90,
												}}
												alt="prodcut photo"
												src={`${productDetails.imageUrl[0]}`}
											/>
										</TableCell>
										<TableCell align="left">{productDetails.title}</TableCell>
										<TableCell align="right">
											{productDetails.price} KM
										</TableCell>
										<TableCell align="center">
											<ButtonGroup size="small" variant="contained">
												<Button onClick={() => decrease(index)}>-</Button>
												<Box m="auto">{product.amount}</Box>
												<Button onClick={() => increase(index)}>+</Button>
											</ButtonGroup>
										</TableCell>
										<TableCell align="center">
											{`${product.amount * productDetails.price} KM`}
										</TableCell>
									</TableRow>
								);
							})}
							<TableRow>
								<TableCell rowSpan={3} />
								<TableCell rowSpan={3} />
								<TableCell rowSpan={3} />
								<TableCell rowSpan={3} />
								<TableCell align="left">Ukupna cijena sadnica:</TableCell>
								<TableCell align="center">{totalOrder} KM</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="left">
									Standardna dostava brzom poštom:
								</TableCell>
								<TableCell align="center">10 KM</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="left">Sve ukupno:</TableCell>
								<TableCell align="center">{totalOrder + 10} KM</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			)}
			{screen.dynamicWidth <= 900 &&
				shoppingCart.map((product, index) => {
					const productDetails = getProductObject(product.id);
					return (
						<Box key={index} paddingBottom={2}>
							<Card>
								<CardMedia
									component="img"
									alt="product photo"
									height="140"
									src={`${productDetails.imageUrl[0]}`}
								/>
								<CardContent>
									<Grid container>
										<Grid item xs={6}>
											<Typography
												align="left"
												color="textPrimary"
												variant="body1"
											>
												Product:
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography
												align="center"
												color="textPrimary"
												variant="body1"
											>
												{productDetails.title}
											</Typography>
										</Grid>
										<Grid item xs={6} paddingTop={0.5}>
											<Typography
												align="left"
												color="textPrimary"
												variant="body1"
											>
												Price:
											</Typography>
										</Grid>
										<Grid item xs={6} paddingTop={0.5}>
											<Typography
												align="center"
												color="textPrimary"
												variant="body1"
											>
												{productDetails.price} KM
											</Typography>
										</Grid>
										<Grid item xs={6} paddingTop={1}>
											<Typography
												paddingTop={0.5}
												align="left"
												color="textPrimary"
												variant="body1"
											>
												Amount:
											</Typography>
										</Grid>
										<Grid item xs={6} paddingTop={1}>
											<Box
												display="flex"
												flexDirection="column"
												alignItems="center"
												justifyContent="center"
											>
												<ButtonGroup size="small" variant="contained">
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
											</Box>
										</Grid>
										<Grid item xs={6} paddingTop={1}>
											<Typography
												align="left"
												color="textPrimary"
												variant="body1"
											>
												Total:
											</Typography>
										</Grid>
										<Grid item xs={6} paddingTop={1}>
											<Typography
												align="center"
												color="textPrimary"
												variant="body1"
											>
												{`${product.amount * productDetails.price}`} KM
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography
												paddingTop={0.5}
												align="left"
												color="textPrimary"
												variant="body1"
											>
												Remove:
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<Box
												display="flex"
												flexDirection="column"
												alignItems="center"
												justifyContent="center"
											>
												<IconButton
													onClick={() => removeItem(index)}
													size="small"
													color="secondary"
													aria-label="delete"
												>
													<DeleteIcon />
												</IconButton>
											</Box>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Box>
					);
				})}
			{screen.dynamicWidth <= 900 && (
				<Box paddingBottom={2}>
					<TotalOrder totalOrder={totalOrder} />
				</Box>
			)}
			<Grid container>
				<Grid item xs={12} sm={12} md={6}>
					<Item>
						<Button
							onClick={() => history.push('/materials')}
							fullWidth
							variant="contained"
							color="warning"
						>
							Nastavi kupovinu
						</Button>
					</Item>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<Item>
						<Button
							onClick={() => history.push('/address')}
							fullWidth
							variant="contained"
							color="success"
						>
							Dodaj Adresu i Potvrdi Narudžbu
						</Button>
					</Item>
				</Grid>
			</Grid>
		</Box>
	);
};

export default CheckOut;
