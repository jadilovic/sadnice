import OrderSummary from '../pages/OrderSummary';
import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Box, Button, Container, Typography, Alert } from '@mui/material';
import UserWindow from '../utils/UserWindow';
import { getUserData } from '../auth/Authentication';
import useAxiosOrders from './useAxiosOrders';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ConfirmDialog from '../components/ConfirmDialog';
import { useHistory } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';

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
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState({});
	const ordersDB = useAxiosOrders();
	const [loading, setLoading] = useState(false);
	const [deleteError, setDeleteError] = useState('');
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		const user = getUserData();
		if (user) {
			if (user.role === 'admin') {
				setAdmin(true);
			}
		}
	}, []);

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const handleHome = () => {
		localStorage.setItem('category', 'Home');
		history.push('/products');
	};

	const deleteOrder = async (orderId) => {
		setLoading(true);
		try {
			await ordersDB.deleteOrder(orderId);
			localStorage.removeItem('order');
			setLoading(false);
			history.push('/orders');
		} catch (error) {
			setDeleteError(error);
			console.log(error.response.data.msg);
		}
	};

	const handleDelete = () => {
		const localStorageOrder = JSON.parse(localStorage.getItem('order'));
		setSelectedOrder(localStorageOrder);
		setConfirmOpen(true);
	};

	if (loading) {
		<LoadingPage />;
	}

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
						{deleteError && (
							<Box
								sx={{
									paddingTop: 2,
									paddingBottom: 2,
									bgcolor: 'background.paper',
								}}
							>
								<Alert severity="error">
									Narudžba nije izbrisana. Nije pronađena narudžba sa unesenim
									ID brojem!
								</Alert>
							</Box>
						)}
						{admin && (
							<Grid item xs={12}>
								<Item>
									<Button
										type="submit"
										variant="contained"
										color="error"
										onClick={handleDelete}
									>
										Poništi / ukloni narudžbu
									</Button>
								</Item>
							</Grid>
						)}
					</Grid>
				</Container>
				<div>
					<ConfirmDialog
						deleteOrder={deleteOrder}
						selectedOrder={selectedOrder}
						setConfirmOpen={setConfirmOpen}
						confirmOpen={confirmOpen}
					/>
				</div>
			</Box>
		</div>
	);
};

export default Print;
