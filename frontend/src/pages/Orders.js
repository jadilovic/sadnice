import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import useAxiosOrders from '../utils/useAxiosOrders';
import UserWindow from '../utils/UserWindow';
import LoadingPage from '../components/LoadingPage';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import useLocalStorageHook from '../utils/useLocalStorageHook';
import statuses from '../data/statuses';
import moment from 'moment';
import { getUserData } from '../auth/Authentication';

// {
// 	field: 'fullName',
// 	headerName: 'Full name',
// 	description: 'This column has a value getter and is not sortable.',
// 	sortable: false,
// 	flex: 1,
// 	valueGetter: (params) =>
// 		`${params.getValue(params.id, 'firstName') || ''} ${
// 			params.getValue(params.id, 'lastName') || ''
// 		}`,
// },

const Orders = () => {
	const screen = UserWindow();
	const mongoDB = useAxiosOrders();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const isMounted = useRef(false);
	const history = useHistory();
	const data = useLocalStorageHook();
	moment.locale('bs');
	let category = localStorage.getItem('category');

	const handleClick = (event, cellValue) => {
		data.saveSelectedUserId(cellValue.row.createdBy);
		history.push('/profile');
	};

	const handleOrder = (event, orderValues) => {
		console.log(orderValues);
		localStorage.setItem('order', JSON.stringify(orderValues));
		history.push('/order');
	};

	const getColor = (selectedStatus) => {
		const status = statuses.find((status) => status.name === selectedStatus);
		return status.hex;
	};

	const displayOrders = async () => {
		const userOrders = localStorage.getItem('userOrders');
		let userId = '';
		if (userOrders) {
			userId = userOrders;
		} else {
			const user = getUserData();
			if (user.role === 'admin') {
				userId = '';
			} else {
				userId = user._id;
			}
		}
		try {
			const dbOrders = await mongoDB.getAllOrders([userId], []);
			dbOrders.sort(function (a, b) {
				// Turn your strings into dates, and then subtract them
				// to get a value that is either negative, positive, or zero.
				return new Date(b.createdAt) - new Date(a.createdAt);
			});
			setOrders(dbOrders);
			setLoading(false);
		} catch (err) {
			console.log(err.response);
		}
		localStorage.removeItem('userOrders');
	};

	useEffect(() => {
		displayOrders();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (isMounted.current) {
			setLoading(true);
			console.log('category use effect : ', category);
			displayOrders();
		} else {
			isMounted.current = true;
		}
	}, [category]); // eslint-disable-line react-hooks/exhaustive-deps

	const columns = [
		{ field: '_id', hide: true, flex: 1 },
		{
			field: 'orderNumber',
			headerName: 'Br.',
			//	flex: 1,
			minWidth: 30,
			align: 'center',
			renderCell: (cellValues) => {
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={(event) => {
							handleOrder(event, cellValues.row);
						}}
					>
						{cellValues.value}
					</Button>
				);
			},
		},
		{
			field: 'createdAt',
			headerName: 'Datum',
			flex: 1,
			//	minWidth: 30,
			renderCell: (params) => (
				<Typography variant="body2">
					{moment(params.value).format('lll')}
				</Typography>
			),
		},
		{ field: 'firstName', headerName: 'Ime', minWidth: 30 },
		{ field: 'lastName', headerName: 'Prezime', minWidth: 30 },
		{
			field: 'createdBy',
			headerName: 'Korisnik',
			minWidth: 30,
			renderCell: (cellValues) => {
				return (
					<Chip
						style={{
							minWidth: 80,
						}}
						color={`${
							cellValues.row.createdBy === '62017af2ee92a0853a8c0021'
								? 'default'
								: 'info'
						}`}
						label={`${
							cellValues.row.createdBy === '62017af2ee92a0853a8c0021'
								? 'Gost'
								: 'Član'
						}`}
						variant="outlined"
						onClick={(event) => {
							handleClick(event, cellValues);
						}}
					/>
				);
			},
		},
		{
			field: 'totalOrder',
			headerName: 'Vrijednost',
			//	flex: 1,
			align: 'right',
			minWidth: 60,
			renderCell: (cellValues) => {
				return <Typography variant="body2">{cellValues.value} KM</Typography>;
			},
		},
		{
			field: 'orderStatus',
			headerName: 'Status',
			minWidth: 30,
			renderCell: (cellValues) => {
				return (
					<Chip
						style={{
							maxWidth: 100,
						}}
						color={getColor(cellValues.row.orderStatus)}
						label={`${
							cellValues.row.orderStatus === 'ongoing'
								? 'U pripremi'
								: cellValues.row.orderStatus === 'completed'
								? 'Ispručeno'
								: 'Otkazano'
						}`}
						variant="filled"
					/>
				);
			},
		},
		{ field: 'city', headerName: 'Grad', flex: 1 },
	];

	console.log('user ID : ', category);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<div>
			<Box
				sx={{
					flexGrow: 1,
					paddingTop: 9,
					paddingLeft: screen.dynamicWidth < 600 ? 0 : 25,
					paddingRight: 2,
					width: '100%',
				}}
			>
				<Typography align="center">Lista narudžbi</Typography>
				<div style={{ height: screen.dynamicHeight - 120, width: '100%' }}>
					<DataGrid
						getRowId={(row) => row._id}
						rows={orders}
						columns={columns}
						pageSize={8}
						rowsPerPageOptions={[8]}
						components={{ Toolbar: GridToolbar }}
						//	checkboxSelection
					/>
				</div>
			</Box>
		</div>
	);
};

export default Orders;
