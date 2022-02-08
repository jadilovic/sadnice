import React, { useState, useEffect } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import useAxiosOrders from '../utils/useAxiosOrders';
import UserWindow from '../utils/UserWindow';
import LoadingPage from '../components/LoadingPage';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import useLocalStorageHook from '../utils/useLocalStorageHook';
import roles from '../data/roles';

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
	const history = useHistory();
	const data = useLocalStorageHook();

	const handleClick = (event, cellValue) => {
		data.saveSelectedUserId(cellValue.row._id);
		history.push('/profile');
	};

	const getColor = (selectedRole) => {
		const role = roles.find((role) => role.name === selectedRole);
		return role.hex;
	};

	const columns = [
		{ field: '_id', hide: true, flex: 1 },
		{ field: 'firstName', headerName: 'First name' },
		{ field: 'lastName', headerName: 'Last name', flex: 1 },
		{ field: 'totalOrder', headerName: 'Vrijednost', flex: 1 },
		{
			field: 'city',
			headerName: 'Grad',
			flex: 1,
		},
		{
			field: 'orderStatus',
			headerName: '',
			minWidth: 30,
			renderCell: (cellValues) => {
				return (
					<Chip
						style={{
							minWidth: 80,
							backgroundColor: getColor(cellValues.row.orderStatus),
						}}
						label={cellValues.row.role}
					/>
				);
			},
		},
		{
			field: 'createdBy',
			headerName: 'Korisnik',
			minWidth: 30,
			renderCell: (cellValues) => {
				return (
					<Chip
						style={{
							minWidth: 80,
							backgroundColor: `${
								cellValues.row.createdBy === '62017af2ee92a0853a8c0021'
									? 'blue'
									: 'orange'
							}`,
						}}
						label={`${
							cellValues.row.createdBy === '62017af2ee92a0853a8c0021'
								? 'Gost'
								: 'Član'
						}`}
					/>
				);
			},
		},
		{
			field: 'edit',
			headerName: 'Detalji',
			minWidth: 30,
			renderCell: (cellValues) => {
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={(event) => {
							handleClick(event, cellValues);
						}}
					>
						Pregled
					</Button>
				);
			},
		},
	];

	const displayOrders = async () => {
		try {
			const dbOrders = await mongoDB.getAllOrders([], []);
			setOrders(dbOrders);
			setLoading(false);
		} catch (err) {
			console.log(err.response);
		}
	};

	useEffect(() => {
		displayOrders();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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
				<Typography>Narudžbe</Typography>
				<div style={{ height: screen.dynamicHeight - 120, width: '100%' }}>
					<DataGrid
						getRowId={(row) => row._id}
						rows={orders}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						checkboxSelection
					/>
				</div>
			</Box>
		</div>
	);
};

export default Orders;
