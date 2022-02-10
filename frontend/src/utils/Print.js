import OrderSummary from '../pages/OrderSummary';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Box, Button, Container, Typography } from '@mui/material';
import UserWindow from '../utils/UserWindow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const Print = () => {
	const componentRef = useRef();
	const screen = UserWindow();
	const history = useHistory();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const handleHome = () => {
		localStorage.setItem('category', 'Home');
		history.push('/products');
	};

	return (
		<div>
			<OrderSummary ref={componentRef} />
			<Box
				sx={{
					flexGrow: 1,
					paddingTop: 1,
					paddingLeft: screen.dynamicWidth < 600 ? 0 : 22,
					paddingRight: 0,
					width: '100%',
				}}
			>
				<Container component="main" maxWidth="md">
					<Grid container spacing={1}>
						<Grid item xs={12} sm={6}>
							<Item>
								<Button
									sx={{ width: 200 }}
									onClick={handlePrint}
									color="success"
									variant="contained"
								>
									Sačuvaj / Print
								</Button>
							</Item>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Item>
								<Button
									sx={{ width: 200 }}
									color="secondary"
									variant="contained"
									onClick={handleHome}
								>
									Sadnice početna
								</Button>
							</Item>
						</Grid>
						<Grid item xs={12}>
							<Item>
								<Typography align="center">
									Za provjeru stanja vaše narudžbe nazovite 062-261-353
								</Typography>
							</Item>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</div>
	);
};

export default Print;
