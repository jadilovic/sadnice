import { Box, Card } from '@mui/material';
import products from '../data/products';
import LoadingPage from '../components/LoadingPage';
import { useState, useEffect } from 'react';
import useAxiosProducts from '../utils/useAxiosProducts';

export const AddressOrder = (props) => {
	const item = props.item;
	const [products, setProducts] = useState([]);
	const productsDB = useAxiosProducts();

	const getProducts = async () => {
		const products = await productsDB.getAllProducts([], []);
		setProducts(products);
	};

	useEffect(() => {
		getProducts();
	}, []);

	const product = products.find((product) => product._id === item.id);

	if (products.length < 1) {
		return <LoadingPage />;
	}

	return (
		<Card
			sx={{
				marginTop: 2,
				display: 'flex',
				flexDirection: { xs: 'column', md: 'column', lg: 'row' },
				alignItems: 'center',
				overflow: 'hidden',
				borderRadius: '12px',
				boxShadow: 1,
				fontWeight: 'bold',
				maxHeight: '100%',
				maxWidth: '100%',
			}}
		>
			<Box
				component="img"
				alignSelf="center"
				sx={{
					height: 120,
					width: 130,
				}}
				alt="The house from the offer."
				// src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
				src={product.imageUrl}
			/>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: { xs: 'center', md: 'center', lg: 'flex-start' },
					marginLeft: { xs: 0, md: 0, lg: 3 },
					minWidth: { md: 350 },
				}}
			>
				<Box component="span" sx={{ fontSize: 16, mt: 1 }}>
					{product.title}
				</Box>
				<Box component="span" sx={{ color: 'primary.main', fontSize: 22 }}>
					{`${product.price} KM`}
				</Box>
				<Box component="span" sx={{ color: 'primary.main', fontSize: 15 }}>
					{`Amount: ${item.amount}`}
				</Box>
			</Box>
		</Card>
	);
};
