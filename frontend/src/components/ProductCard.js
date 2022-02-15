import React from 'react';
import { useHistory } from 'react-router-dom';
import ages from '../data/ages';
import {
	Grid,
	Card,
	CardContent,
	Typography,
	CardMedia,
	CardActionArea,
} from '@mui/material';

const ProductCard = ({ product, shoppingCart, setShoppingCart }) => {
	const history = useHistory();

	const handleProduct = (productId) => {
		localStorage.setItem('product_id', productId); //store product id
		history.push('/product');
	};

	const getAgeName = (number) => {
		const age = ages.find((age) => age.value === number);
		return age.name;
	};

	return (
		<Card>
			<CardActionArea onClick={() => handleProduct(product._id)}>
				<CardMedia
					component="img"
					height="130"
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
								{`${product.category} ${product.title}`}
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
								Cijena: {product.price.toFixed(2)} KM
							</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
						<Grid
							item
							sx={{
								alignItems: 'center',
								display: 'flex',
							}}
						>
							<Typography align="center" gutterBottom variant="body2">
								{`${getAgeName(product.age)}`}
							</Typography>
						</Grid>
						<Grid
							item
							sx={{
								alignItems: 'center',
								display: 'flex',
							}}
						>
							<Typography align="center" gutterBottom variant="body2">
								{product.packaging}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ProductCard;
