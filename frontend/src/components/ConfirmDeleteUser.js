import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDeleteUser(props) {
	const { selectedUser, confirmOpen, setConfirmOpen, deleteUser } = props;

	const handleClose = () => {
		setConfirmOpen(false);
	};

	const handleYes = () => {
		deleteUser(selectedUser._id);
		setConfirmOpen(false);
	};

	return (
		<div>
			<Dialog open={confirmOpen} onClose={handleClose}>
				<DialogTitle>{'Poništi / ukloni korisnika?'}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`Da li želite u potpunosti izbrisati korisnika ${selectedUser.firstName} ${selectedUser.lastName}?`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="success" onClick={handleYes}>
						Da
					</Button>
					<Button
						variant="contained"
						color="error"
						onClick={handleClose}
						autoFocus
					>
						Ne
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
