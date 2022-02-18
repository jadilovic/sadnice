import React, { useState, useEffect } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import useAxiosRequest from '../utils/useAxiosRequest';
import UserWindow from '../utils/UserWindow';
import LoadingPage from '../components/LoadingPage';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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

const Users = () => {
	const screen = UserWindow();
	const mongoDB = useAxiosRequest();
	const [users, setUsers] = useState([]);
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
		{
			field: 'email',
			headerName: 'Email',
			flex: 1,
		},
		{
			field: 'role',
			headerName: 'Role',
			minWidth: 30,
			renderCell: (cellValues) => {
				return (
					<Chip
						style={{
							minWidth: 80,
						}}
						color={getColor(cellValues.value)}
						label={cellValues.row.role}
						variant="filled"
					/>
				);
			},
		},
		{
			field: 'isActive',
			headerName: 'Active',
			minWidth: 30,
			renderCell: (cellValues) => {
				return (
					<Chip
						style={{
							minWidth: 80,
						}}
						label={`${cellValues.row.isActive ? 'Yes' : 'No'}`}
						color={`${cellValues.row.isActive ? 'success' : 'error'}`}
						variant="outlined"
					/>
				);
			},
		},
		{
			field: 'edit',
			headerName: 'Info / Edit',
			minWidth: 100,
			renderCell: (cellValues) => {
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={(event) => {
							handleClick(event, cellValues);
						}}
					>
						Info / Edit
					</Button>
				);
			},
		},
	];

	const displayUsers = async () => {
		try {
			const dbUsers = await mongoDB.getAllUsers([], []);
			setUsers(dbUsers);
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
				<Typography align="center">Lista registrovanih korisnika</Typography>
				<div style={{ height: screen.dynamicHeight - 120, width: '100%' }}>
					<DataGrid
						getRowId={(row) => row._id}
						rows={users}
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

export default Users;
