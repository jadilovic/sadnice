import { Box, Card } from '@mui/material';
import LoadingPage from './LoadingPage';
import { useState, useEffect } from 'react';
import useAxiosProducts from '../utils/useAxiosProducts';

export const OrderItem = (props) => {
	const item = props.item;
	const [products, setProducts] = useState([]);
	const productsDB = useAxiosProducts();

	const getProducts = async () => {
		const products = await productsDB.getAllProducts([], [], []);
		setProducts(products);
	};

	useEffect(() => {
		getProducts();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const product = products.find((product) => product._id === item.id);

	if (products.length < 1) {
		return <LoadingPage />;
	}

	return (
		<Card
			sx={{
				marginBottom: 2,
				marginRight: { sm: 0, md: 2, lg: 2 },
				display: 'flex',
				flexDirection: { xs: 'row', md: 'row', lg: 'row' },
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
				alt="product image"
				src={product.imageUrl[0]}
			/>
			<Box
				sx={{
					paddingTop: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: { xs: 'flex-start', md: 'flex-start', lg: 'flex-start' },
					marginLeft: { xs: 5, md: 5, lg: 5 },
					//	minWidth: { md: 350 },
				}}
			>
				<Box component="span" sx={{ fontSize: 16, mt: 1 }}>
					{`${product.category} ${product.title}`}
				</Box>
				<Box component="span" sx={{ color: 'primary.main', fontSize: 18 }}>
					{`${product.price.toFixed(2)} KM`}
				</Box>
				<Box component="span" sx={{ color: 'primary.main', fontSize: 16 }}>
					{`Komada: ${item.amount}`}
				</Box>
			</Box>
		</Card>
	);
};
