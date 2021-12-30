import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Avatar,
	Box,
	CardContent,
	Divider,
	Grid,
	Typography,
	Button,
	ButtonGroup,
	CardMedia,
} from '@mui/material';
import image from '../images/bildit.png';
import { styled } from '@mui/material/styles';
import MainCard from './MainCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CardWrapper = styled(MainCard)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: '#fff',
	overflow: 'hidden',
	position: 'relative',
	'&:after': {
		content: '""',
		position: 'absolute',
		width: 210,
		height: 210,
		background: theme.palette.secondary[800],
		borderRadius: '50%',
		top: -85,
		right: -95,
		[theme.breakpoints.down('sm')]: {
			top: -105,
			right: -140,
		},
	},
	'&:before': {
		content: '""',
		position: 'absolute',
		width: 210,
		height: 210,
		background: theme.palette.secondary[800],
		borderRadius: '50%',
		top: -125,
		right: -15,
		opacity: 0.5,
		[theme.breakpoints.down('sm')]: {
			top: -155,
			right: -70,
		},
	},
}));

const MaterialCard = ({ product, shoppingCart, setShoppingCart }) => {
	const [itemAmount, setItemAmount] = useState(0);
	const [open, setOpen] = useState(false);
	const history = useHistory();

	useEffect(() => {
		const currentShoppingCart = JSON.parse(
			localStorage.getItem('shopping_cart')
		);
		if (currentShoppingCart) {
			setShoppingCart(currentShoppingCart);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleContinueShopping = () => {
		localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart)); //store shopping cart items
		setOpen(false);
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
		setItemAmount(0);
		handleClickOpen();
	};

	const handleCheckout = () => {
		localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart)); //store shopping cart items
		history.push('/checkout');
	};

	return (
		<CardWrapper border={false} content={false}>
			<CardMedia>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						maxHeight: 200,
					}}
				>
					<img
						//	style={{ height: '100%', width: '100%' }}
						alt="Product"
						src={product.imageUrl}
						variant="rounded"
					/>
				</Box>
			</CardMedia>
			<CardContent sx={{ minHeight: 120 }}>
				<Typography
					align="center"
					color="textPrimary"
					gutterBottom
					variant="body1"
				>
					{product.title}
				</Typography>
				<Typography align="left" color="textPrimary" variant="p">
					{product.description}
				</Typography>
			</CardContent>
			<Box sx={{ flexGrow: 1 }} />
			<Divider />
			<Box sx={{ p: 2 }}>
				<Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
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
							startIcon={<ShoppingCartIcon />}
						>
							Order
						</Button>
					</Grid>
				</Grid>
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
		</CardWrapper>
	);
};

export default MaterialCard;
