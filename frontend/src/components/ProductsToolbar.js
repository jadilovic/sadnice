import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Badge } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductFilters from './ProductFilters';
import { useHistory } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}));

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: 20,
	marginLeft: 0,
	width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

export default function ProductsToolbar(props) {
	const history = useHistory();
	const {
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
						products={products}
						setFilteredProducts={setFilteredProducts}
						isOpenFilter={isOpenFilter}
						onOpenFilter={onOpenFilter}
						onCloseFilter={onCloseFilter}
						setSelectedFilters={setSelectedFilters}
					/>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
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
		// <Box sx={{ flexGrow: 1 }}>
		// 	<AppBar position="static">
		// 		<Toolbar>
		// 			<IconButton
		// 				size="large"
		// 				edge="start"
		// 				color="inherit"
		// 				aria-label="open drawer"
		// 				sx={{ mr: 2 }}
		// 			>
		// 				<FilterListIcon />
		// 			</IconButton>
		// 			<Search>
		// 				<SearchIconWrapper>
		// 					<SearchIcon />
		// 				</SearchIconWrapper>
		// 				<StyledInputBase
		// 					placeholder="Search…"
		// 					inputProps={{ 'aria-label': 'search' }}
		// 				/>
		// 			</Search>
		// 			<IconButton
		// 				onClick={() => history.push('/checkout')}
		// 				aria-label="cart"
		// 			>
		// 				<StyledBadge badgeContent={shoppingCartLength} color="secondary">
		// 					<ShoppingCartIcon />
		// 				</StyledBadge>
		// 			</IconButton>
		// 		</Toolbar>
		// 	</AppBar>
		// </Box>
	);
}

// import React, { useEffect, useState } from 'react';
// import {
// 	Box,
// 	Button,
// 	Card,
// 	Divider,
// 	TextField,
// 	InputAdornment,
// 	SvgIcon,
// 	Paper,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import Badge from '@mui/material/Badge';
// import { styled, alpha } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { useHistory } from 'react-router-dom';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import InputBase from '@mui/material/InputBase';

// const Search = styled('div')(({ theme }) => ({
// 	position: 'relative',
// 	borderRadius: theme.shape.borderRadius,
// 	backgroundColor: alpha(theme.palette.common.white, 0.15),
// 	'&:hover': {
// 		backgroundColor: alpha(theme.palette.common.white, 0.25),
// 	},
// 	marginLeft: 0,
// 	width: '100%',
// 	[theme.breakpoints.up('sm')]: {
// 		marginLeft: theme.spacing(1),
// 		width: 'auto',
// 	},
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
// 	padding: theme.spacing(0, 2),
// 	height: '100%',
// 	position: 'absolute',
// 	pointerEvents: 'none',
// 	display: 'flex',
// 	alignItems: 'center',
// 	justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
// 	color: 'inherit',
// 	'& .MuiInputBase-input': {
// 		padding: theme.spacing(1, 1, 1, 0),
// 		// vertical padding + font size from searchIcon
// 		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// 		transition: theme.transitions.create('width'),
// 		width: '100%',
// 	},
// }));

// const StyledBadge = styled(Badge)(({ theme }) => ({
// 	'& .MuiBadge-badge': {
// 		right: -3,
// 		top: 13,
// 		border: `2px solid ${theme.palette.background.paper}`,
// 		padding: '0 4px',
// 	},
// }));

// const MaterialsListToolbar = (props) => {
// 	const history = useHistory();
// 	const [shoppingCartLength, setShoppingCartLength] = useState(0);

// 	useEffect(() => {
// 		setShoppingCartLength(props.shoppingCart.length);
// 	}, [props.shoppingCart.length]);

// 	return (
// 		<Box paddingTop={1} paddingBottom={1}>
// 			<Box
// 				sx={{
// 					alignItems: 'center',
// 					display: 'flex',
// 					justifyContent: 'space-between',
// 					flexWrap: 'wrap',
// 					//	m: -1,
// 				}}
// 			>
// 				<Button
// 					variant="outlined"
// 					color="inherit"
// 					// onClick={onOpenFilter}
// 				>
// 					<FilterListIcon />
// 				</Button>
// 				<Search>
// 					<SearchIconWrapper>
// 						<SearchIcon />
// 					</SearchIconWrapper>
// 					<StyledInputBase
// 						placeholder="Search…"
// 						inputProps={{ 'aria-label': 'search' }}
// 					/>
// 				</Search>

// 				<Box>
// 					<IconButton
// 						onClick={() => history.push('/checkout')}
// 						aria-label="cart"
// 					>
// 						<StyledBadge badgeContent={shoppingCartLength} color="secondary">
// 							<ShoppingCartIcon />
// 						</StyledBadge>
// 					</IconButton>
// 				</Box>
// 			</Box>
// 		</Box>
// 	);
// };
// export default MaterialsListToolbar;
