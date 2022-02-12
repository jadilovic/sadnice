import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog(props) {
	const { selectedOrder, confirmOpen, setConfirmOpen, deleteOrder } = props;

	const handleClose = () => {
		setConfirmOpen(false);
	};

	const handleYes = () => {
		deleteOrder(selectedOrder._id);
		setConfirmOpen(false);
	};

	return (
		<div>
			<Dialog open={confirmOpen} onClose={handleClose}>
				<DialogTitle>{'Poništi / ukloni narudžbu?'}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`Da li zelite u potpunosti izbrisati narudzbu broj ${selectedOrder.orderNumber}?`}
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
