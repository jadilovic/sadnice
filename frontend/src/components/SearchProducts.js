import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

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
	},
}));

export default function SearchProducts(props) {
	const { products, setFilteredProducts } = props;

	const handleSearch = (event) => {
		let value = event.target.value.toLowerCase();
		let result = [];
		result = products.filter((product) => {
			return (
				product.title.match(new RegExp(value, 'i')) ||
				product.category.match(new RegExp(value, 'i'))
			);
		});
		setFilteredProducts(result);
	};

	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Pretraga sadnica..."
				onChange={(event) => handleSearch(event)}
				inputProps={{ 'aria-label': 'search' }}
			/>
		</Search>
	);
}
