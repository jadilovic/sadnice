import { Box, Card } from '@mui/material';
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
				marginBottom: 2,
				marginLeft: { sm: 0, md: 2, lg: 2 },
				display: 'flex',
				flexDirection: { xs: 'row', md: 'row', lg: 'row' },
				// alignItems: 'center',
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
					{product.title}
				</Box>
				<Box component="span" sx={{ color: 'primary.main', fontSize: 18 }}>
					{`${product.price} KM`}
				</Box>
				<Box component="span" sx={{ color: 'primary.main', fontSize: 16 }}>
					{`Komada: ${item.amount}`}
				</Box>
			</Box>
		</Card>
	);
};
