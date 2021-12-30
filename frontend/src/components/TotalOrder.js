import { Divider, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import { ButtonGroup, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import { IconButton, Chip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
// import EmptyCart from '../pages/EmptyCart';
// import UserWindow from '../utils/UserWindow';
// import products from '../data/products';
// import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
// import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	width: '100%',
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const TotalOrder = (props) => {
	const totalOrder = props.totalOrder;
	return (
		<Card>
			<CardContent>
				<Typography
					style={{ textAlign: 'center' }}
					gutterBottom
					variant="h6"
					component="div"
				>
					Total in shopping cart
				</Typography>
				<Divider />
				<Stack direction="row">
					<Item style={{ textAlign: 'left' }}>
						<Typography variant="body1" color="text.secondary">
							Total items price:
						</Typography>
					</Item>
					<Item style={{ textAlign: 'right' }}>
						<Typography align="right" color="textPrimary" variant="body1">
							{`${totalOrder} KM`}
						</Typography>
					</Item>
				</Stack>
				<Stack direction="row">
					<Item style={{ textAlign: 'left' }}>
						<Typography variant="body1" color="text.secondary">
							Shipping:
						</Typography>
					</Item>
					<Item style={{ textAlign: 'right' }}>
						<Typography align="right" color="textPrimary" variant="body1">
							10 KM
						</Typography>
					</Item>
				</Stack>
				<Stack direction="row">
					<Item style={{ textAlign: 'left' }}>
						<Typography variant="body1" color="text.secondary">
							Total order:
						</Typography>
					</Item>
					<Item style={{ textAlign: 'right' }}>
						<Typography align="right" color="textPrimary" variant="body1">
							{`${totalOrder + 10} KM`}
						</Typography>
					</Item>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default TotalOrder;
