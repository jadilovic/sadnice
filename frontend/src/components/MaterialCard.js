import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
	Box,
	Divider,
	Grid,
	Typography,
	CardMedia,
	CardActionArea,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MainCard from './MainCard';

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
	const history = useHistory();

	const handleProduct = (productId) => {
		localStorage.setItem('product_id', productId); //store product id
		history.push('/product');
	};

	return (
		<CardWrapper border={false} content={false}>
			<CardActionArea onClick={() => handleProduct(product._id)}>
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
							<Typography align="center" gutterBottom variant="body1">
								{product.title}
							</Typography>
						</Grid>
						<Grid
							item
							sx={{
								alignItems: 'center',
								display: 'flex',
							}}
						>
							<Typography align="center" gutterBottom variant="body1">
								Cijena: {product.price} KM
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</CardActionArea>
		</CardWrapper>
	);
};

export default MaterialCard;
