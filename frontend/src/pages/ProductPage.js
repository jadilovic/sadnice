import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Avatar,
	Box,
	CardContent,
	Grid,
	Typography,
	Button,
	ButtonGroup,
	CardMedia,
	Card,
	Container,
	Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useAxiosProducts from '../utils/useAxiosProducts';
import LoadingPage from '../components/LoadingPage';
import UserWindow from '../utils/UserWindow';
import { Badge } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CollectionsIcon from '@mui/icons-material/Collections';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}));

const ProductPage = () => {
	const [product, setProduct] = useState({});
	const [itemAmount, setItemAmount] = useState(0);
	const [shoppingCart, setShoppingCart] = useState([]);
	const [shoppingCartLength, setShoppingCartLength] = useState(0);
	const [open, setOpen] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);
	const [openImages, setOpenImages] = useState(false);
	const [count, setCount] = useState(0);
	const history = useHistory();
	const productsDB = useAxiosProducts();
	const screen = UserWindow();
	const [loading, setLoading] = useState(true);

	const getProduct = async (id) => {
		const data = await productsDB.getProduct(id);
		setProduct(data.product);
		setLoading(false);
	};

	useEffect(() => {
		const currentShoppingCart = JSON.parse(
			localStorage.getItem('shopping_cart')
		);
		if (currentShoppingCart) {
			setShoppingCart(currentShoppingCart);
			setShoppingCartLength(currentShoppingCart.length);
		}
		const localStorageProductId = localStorage.getItem('product_id'); //get product id
		getProduct(localStorageProductId);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleContinueShopping = () => {
		localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart)); //store shopping cart items
		setOpen(false);
		history.push('/products');
	};

	const increase = () => {
		setItemAmount(itemAmount + 1);
	};

	const decrease = () => {
		if (itemAmount > 0) {
			setItemAmount(itemAmount - 1);
		}
	};

	const order = (itemId) => {
		if (itemAmount < 1) {
			setOpenAlert(true);
			return null;
		}
		const newItem = {
			id: itemId,
			amount: itemAmount,
		};
		const itemIndex = shoppingCart.findIndex(
			(element) => element.id === itemId
		);
		if (itemIndex > -1) {
			shoppingCart[itemIndex].amount =
				shoppingCart[itemIndex].amount + itemAmount;
		} else {
			shoppingCart.push(newItem);
		}
		setShoppingCart([...shoppingCart]);
		setShoppingCartLength(shoppingCart.length);
		setItemAmount(0);
		handleClickOpen();
	};

	const handleCheckout = () => {
		localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart)); //store shopping cart items
		history.push('/checkout');
	};
	const handleOpenImages = () => setOpenImages(true);
	const handleCloseImages = () => setOpenImages(false);
	const handleCloseAlert = () => setOpenAlert(false);

	const imageCount = () => {
		if (count < 2) {
			setCount(count + 1);
		} else {
			setCount(0);
		}
	};

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<>
			<Box
				component="main"
				sx={{
					marginTop: screen.dynamicWidth < 600 ? 7 : 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingLeft: screen.dynamicWidth < 600 ? 1 : 24,
					paddingRight: 1,
				}}
			>
				<Container component="main" maxWidth="md">
					<Card style={{ marginTop: 5 }}>
						<CardHeader
							avatar={<Avatar src={product.imageUrl[0]} alt="Product photo" />}
							action={
								<>
									<IconButton onClick={handleOpenImages} aria-label="settings">
										<CollectionsIcon fontSize="medium" />
									</IconButton>
									<IconButton
										onClick={() => history.push('/checkout')}
										aria-label="cart"
									>
										<StyledBadge
											badgeContent={shoppingCartLength}
											color="secondary"
										>
											<ShoppingCartIcon />
										</StyledBadge>
									</IconButton>
								</>
							}
							title={`${product.category} ${product.title}`}
							subheader={`Cijena: ${product.price.toFixed(2)} KM`}
						/>
						<Grid container spacing={0.5}>
							<Grid
								item
								sx={{
									alignItems: 'center',
									display: 'flex',
								}}
								lg={4}
								md={12}
								xs={12}
							>
								<CardMedia
									component="img"
									height="194"
									//	image="/static/images/cards/paella.jpg"
									src={product.imageUrl[0]}
									alt="Paella dish"
								/>
							</Grid>
							<Grid
								item
								sx={{
									alignItems: 'center',
									display: 'flex',
								}}
								lg={4}
								md={6}
								xs={6}
							>
								<CardMedia
									component="img"
									height="194"
									//	image="/static/images/cards/paella.jpg"
									src={product.imageUrl[1]}
									alt="Paella dish"
								/>
							</Grid>
							<Grid
								item
								sx={{
									alignItems: 'center',
									display: 'flex',
								}}
								lg={4}
								md={6}
								xs={6}
							>
								<CardMedia
									component="img"
									height="194"
									//	image="/static/images/cards/paella.jpg"
									src={product.imageUrl[2]}
									alt="Paella dish"
								/>
							</Grid>
						</Grid>
						<CardContent>
							<Typography
								align="justify"
								variant="body2"
								color="text.secondary"
							>
								{product.description}
							</Typography>
							<Typography variant="body2">
								{`Starost sadnice: ${product.age} ${
									product.age > 1 ? 'godine' : 'godina'
								}`}
							</Typography>
							<Typography variant="body2">
								Pakovanje: {product.packaging}
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							<Grid
								container
								spacing={2}
								sx={{ justifyContent: 'space-between' }}
							>
								<Grid
									item
									sx={{
										alignItems: 'center',
										display: 'flex',
									}}
								>
									{product.available ? (
										<ButtonGroup variant="contained">
											<Button onClick={decrease}>-</Button>
											<Box m="auto">
												<Typography
													align="center"
													color="textPrimary"
													variant="body1"
												>
													{itemAmount}
												</Typography>
											</Box>
											<Button onClick={increase}>+</Button>
										</ButtonGroup>
									) : (
										<Chip
											style={{
												minWidth: 70,
											}}
											color="error"
											label="Rasprodano"
										/>
									)}
								</Grid>
								<Grid
									item
									sx={{
										alignItems: 'center',
										display: 'flex',
									}}
								>
									<Button
										onClick={() => order(product._id)}
										variant="contained"
										disabled={!product.available}
									>
										Dodaj u korpu
									</Button>
								</Grid>
							</Grid>
						</CardActions>
					</Card>
				</Container>
			</Box>
			<div>
				<Dialog open={open} onClose={handleContinueShopping}>
					<DialogTitle>
						{`${product.category} ${product.title} sadnice su dodane u vašu korpu!`}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Možete nastaviti sa kupovinom i dodavati druge sadnice u korpu ili
							želite finalizirati narudžbu.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							color="warning"
							onClick={handleContinueShopping}
						>
							Nastaviti dodavanje
						</Button>
						<Button
							variant="contained"
							color="success"
							onClick={handleCheckout}
							autoFocus
						>
							Finaliziranje narudžbe
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			<div>
				<Dialog open={openImages} onClose={handleCloseImages}>
					<DialogTitle>
						{product.title}, {product.price} KM
					</DialogTitle>
					<DialogContent onClick={imageCount}>
						<img src={product.imageUrl[count]} alt="product link" />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseImages}>Zatvori</Button>
					</DialogActions>
				</Dialog>
			</div>
			<div>
				<Dialog open={openAlert} onClose={handleCloseAlert}>
					<DialogTitle>{'Dodajte količinu sadnica!'}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Prije dodavanja odabrane sadnice u korpu za narudžbe potrebno je
							navesti količinu sadnica koje želite.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" onClick={handleCloseAlert}>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</>
	);
};

export default ProductPage;
