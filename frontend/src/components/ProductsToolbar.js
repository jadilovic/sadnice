import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductFilters from './ProductFilters';
import { useHistory } from 'react-router-dom';
import SearchProducts from './SearchProducts';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}));

export default function ProductsToolbar(props) {
	const history = useHistory();
	const {
		setCount,
		setCurrentPage,
		category,
		products,
		setFilteredProducts,
		isOpenFilter,
		onOpenFilter,
		onCloseFilter,
		setSelectedFilters,
	} = props;
	const [shoppingCartLength, setShoppingCartLength] = useState(0);

	useEffect(() => {
		setShoppingCartLength(props.shoppingCart.length);
	}, [props.shoppingCart.length]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<ProductFilters
						setCount={setCount}
						setCurrentPage={setCurrentPage}
						category={category}
						products={products}
						setFilteredProducts={setFilteredProducts}
						isOpenFilter={isOpenFilter}
						onOpenFilter={onOpenFilter}
						onCloseFilter={onCloseFilter}
						setSelectedFilters={setSelectedFilters}
					/>
					<SearchProducts
						products={products}
						setFilteredProducts={setFilteredProducts}
						setSelectedFilters={setSelectedFilters}
					/>
					<IconButton
						onClick={() => history.push('/checkout')}
						aria-label="cart"
					>
						<StyledBadge badgeContent={shoppingCartLength} color="secondary">
							<ShoppingCartIcon />
						</StyledBadge>
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
