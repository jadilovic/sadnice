import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Avatar,
	Box,
	CardContent,
	Modal,
	Grid,
	Typography,
	Button,
	ButtonGroup,
	CardMedia,
	Card,
	Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
//import MainCard from './MainCard';
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
import MaterialsListToolbar from '../components/Materials-list-toolbar';
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

const MaterialCard = () => {
	const [product, setProduct] = useState(null);
	const [itemAmount, setItemAmount] = useState(0);
	const [shoppingCart, setShoppingCart] = useState([]);
	const [shoppingCartLength, setShoppingCartLength] = useState(0);
	const [open, setOpen] = useState(false);
	const [openImages, setOpenImages] = useState(false);
	const history = useHistory();
	const productsDB = useAxiosProducts();
	const screen = UserWindow();

	const getProduct = async (id) => {
		const data = await productsDB.getProduct(id);
		setProduct(data.product);
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
		history.push('/materials');
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
	console.log(openImages);

	if (!product) {
		return <LoadingPage />;
	}

	return (
		<>
			<Box
				component="main"
				sx={{
					marginTop: 7,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingLeft: screen.dynamicWidth < 600 ? 2 : 24,
					paddingRight: 2,
				}}
			>
				<Container component="main" maxWidth="md">
					<Card style={{ marginTop: 5, minHeight: 600 }}>
						<CardHeader
							avatar={<Avatar src={product.imageUrl} alt="Product photo" />}
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
							title={product.title}
							subheader={`Cijena: ${product.price} KM`}
						/>
						<Grid container spacing={1}>
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
									src={product.imageUrl}
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
									src={product.imageUrl}
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
									src={product.imageUrl}
									alt="Paella dish"
								/>
							</Grid>
						</Grid>
						<CardContent>
							<Typography variant="body2" color="text.secondary">
								This impressive paella is a perfect party dish and a fun meal to
								cook together with your guests. Add 1 cup of frozen peas along
								with the mussels, if you like.
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
									<ButtonGroup variant="contained">
										<Button onClick={decrease}>-</Button>
										<Box m="auto" paddingLeft={2}>
											{itemAmount}
										</Box>
										<Button onClick={increase}>+</Button>
									</ButtonGroup>
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
										//	startIcon={<ShoppingCartIcon />}
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
				<Dialog
					open={open}
					onClose={handleContinueShopping}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle color="yellow" id="alert-dialog-title">
						{`'${product.title}' has been added to your shopping cart!`}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							You can continue shopping and add more items to your shopping cart
							or proceed to checkout.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							variant="outlined"
							color="warning"
							onClick={handleContinueShopping}
						>
							Continue Shopping
						</Button>
						<Button
							variant="outlined"
							color="success"
							onClick={handleCheckout}
							autoFocus
						>
							Go To Checkout
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			<div>
				<Dialog open={openImages} onClose={handleCloseImages}>
					<DialogTitle id="alert-dialog-title">
						{product.title}, {product.price} KM
					</DialogTitle>
					<DialogContent>
						<img src={product.imageUrl} alt="product link" />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseImages}>Zatvori</Button>
					</DialogActions>
				</Dialog>
			</div>
		</>
	);
};

export default MaterialCard;
