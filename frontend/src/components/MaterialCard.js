import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	Grid,
	Card,
	CardContent,
	Typography,
	CardMedia,
	CardActionArea,
} from '@mui/material';

const MaterialCard = ({ product, shoppingCart, setShoppingCart }) => {
	const history = useHistory();

	const handleProduct = (productId) => {
		localStorage.setItem('product_id', productId); //store product id
		history.push('/product');
	};

	return (
		<Card>
			<CardActionArea onClick={() => handleProduct(product._id)}>
				<CardMedia
					component="img"
					height="140"
					//	image="/static/images/cards/contemplative-reptile.jpg"
					alt="seedling image"
					src={product.imageUrl[0]}
				/>
				<CardContent>
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
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default MaterialCard;
