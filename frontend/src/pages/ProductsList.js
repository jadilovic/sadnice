import React, { useState, useEffect } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import useAxiosProducts from '../utils/useAxiosProducts';
import UserWindow from '../utils/UserWindow';
import LoadingPage from '../components/LoadingPage';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import useLocalStorageHook from '../utils/useLocalStorageHook';

const ProductsList = () => {
	const screen = UserWindow();
	const mongoDB = useAxiosProducts();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	const data = useLocalStorageHook();

	const handleClick = (event, cellValue) => {
		data.saveSelectedProductId(cellValue.row._id);
		history.push('/product_edit');
	};

	const columns = [
		{ field: '_id', hide: true, flex: 1 },
		{ field: 'title', headerName: 'Sorta' },
		{ field: 'category', headerName: 'Naziv', flex: 1 },
		{
			field: 'description',
			headerName: 'Edit',
			width: 120,
			renderCell: (cellValues) => {
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={(event) => {
							handleClick(event, cellValues);
						}}
					>
						{cellValues.value.substr(0, 10)}
					</Button>
				);
			},
		},
		{
			field: 'price',
			headerName: 'Cijena',
			align: 'right',
			minWidth: 60,
			renderCell: (cellValues) => {
				return (
					<Typography variant="body2">
						{cellValues.value.toFixed(2)} KM
					</Typography>
				);
			},
		},
		{
			field: 'packaging',
			headerName: 'Pakovanje',
			flex: 1,
		},
		{
			field: 'age',
			headerName: 'Starost',
			align: 'center',
			flex: 1,
		},
		{
			field: 'available',
			headerName: 'Na stanju',
			align: 'center',
			renderCell: (cellValues) => {
				return (
					<Chip
						style={{
							minWidth: 70,
						}}
						color={`${cellValues.value === true ? 'success' : 'error'}`}
						label={`${cellValues.value === true ? 'Da' : 'Ne'}`}
						variant="filled"
					/>
				);
			},
		},
	];

	const displayUsers = async () => {
		try {
			const dbProducts = await mongoDB.getAllProducts([], [], []);
			setProducts(dbProducts);
			setLoading(false);
		} catch (err) {
			console.log(err.response);
		}
	};

	useEffect(() => {
		displayUsers();
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
				<Typography align="center">Lista sadnica u ponudi</Typography>
				<div style={{ height: screen.dynamicHeight - 120, width: '100%' }}>
					<DataGrid
						getRowId={(row) => row._id}
						rows={products}
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

export default ProductsList;
