import React from 'react';
import { Button, CardMedia, CssBaseline } from '@mui/material';
import Grid from '@mui/material/Grid';
import image from '../images/Error404.png';
import UserWindow from '../utils/UserWindow';
import { Link as RouterLink } from 'react-router-dom';

export default function Error() {
	const screen = UserWindow();

	return (
		<>
			<Grid
				sx={{
					flexGrow: 1,
					paddingTop: 9,
					paddingLeft: screen.dynamicWidth < 600 ? 2 : 24,
					paddingRight: 2,
					width: '100%',
				}}
				item
				xs={12}
			>
				<Grid
					paddingTop={4}
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justify="center"
					style={{ minHeight: '25vh' }}
				>
					<CssBaseline />
					<CardMedia
						component="img"
						alt="Error Page"
						src={image}
						style={{ width: '80%', height: '80%' }}
						title="Error Page"
					/>
					<div style={{ paddingTop: 20 }}>
						<Button
							to="/products"
							size="large"
							variant="contained"
							component={RouterLink}
						>
							Go to Home
						</Button>
					</div>
				</Grid>
			</Grid>
		</>
	);
}
