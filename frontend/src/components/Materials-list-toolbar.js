import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Card,
	Divider,
	TextField,
	InputAdornment,
	SvgIcon,
	Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}));

const MaterialsListToolbar = (props) => {
	const history = useHistory();
	const [shoppingCartLength, setShoppingCartLength] = useState(0);

	useEffect(() => {
		setShoppingCartLength(props.shoppingCart.length);
	}, [props.shoppingCart.length]);

	return (
		<Box paddingTop={1}>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					//	m: -1,
				}}
			>
				{/* <Typography sx={{ m: 1 }} variant="h5">
					Products
				</Typography> */}
				<Paper
					component="form"
					style={{ justifyContent: 'center' }}
					sx={{
						display: 'flex',
						alignItems: 'center',
						// width: '100%',
						height: 45,
					}}
				>
					<Button
						style={{ minWidth: 100 }}
						variant="outlined"
						color="inherit"
						// onClick={onOpenFilter}
					>
						Filters&nbsp;
					</Button>
				</Paper>
				<Card>
					<TextField
						size="small"
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SvgIcon fontSize="small" color="action">
										<SearchIcon />
									</SvgIcon>
								</InputAdornment>
							),
						}}
						placeholder="Search product"
						variant="outlined"
					/>
				</Card>
				<Box>
					<IconButton
						onClick={() => history.push('/checkout')}
						aria-label="cart"
					>
						<StyledBadge badgeContent={shoppingCartLength} color="secondary">
							<ShoppingCartIcon />
						</StyledBadge>
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};
export default MaterialsListToolbar;
