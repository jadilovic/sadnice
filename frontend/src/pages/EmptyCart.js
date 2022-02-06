import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';
import empty_cart from '../images/empty-cart.jpg';
import UserWindow from '../utils/UserWindow';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	display: 'flex',
	minHeight: '100%',
	alignItems: 'center',
	paddingTop: theme.spacing(10),
	paddingBottom: theme.spacing(5),
}));

// ----------------------------------------------------------------------

export default function Restricted() {
	const screen = UserWindow();
	console.log('restricted');
	return (
		<RootStyle title="403 Access Denied | Restricted">
			<Container>
				<Box
					sx={{
						paddingLeft: screen.dynamicWidth < 600 ? 0 : 22,
						maxWidth: 700,
						margin: 'auto',
						textAlign: 'center',
					}}
				>
					<Typography variant="h5" paragraph>
						Vaša korpa je prazna!
					</Typography>
					<Typography sx={{ color: 'text.secondary' }}>
						Mozete se vratiti na prethodnu stranici ili kliknuti na Sadnice.
					</Typography>

					<Box
						maxHeight={330}
						component="img"
						src={empty_cart}
						sx={{
							height: '100%',
							width: '100%',
							mx: 'auto',
							my: { xs: 5, sm: 5 },
						}}
					/>

					<Button
						to="/products"
						size="large"
						variant="contained"
						component={RouterLink}
					>
						Sadnice
					</Button>
				</Box>
			</Container>
		</RootStyle>
	);
}
