import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';
import restricted from '../images/restricted.jpg';
import UserWindow from '../utils/UserWindow';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	display: 'flex',
	minHeight: '100%',
	alignItems: 'center',
	paddingTop: theme.spacing(10),
	paddingBottom: theme.spacing(10),
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
						Sorry, this is restricted page!
					</Typography>
					<Typography sx={{ color: 'text.secondary' }}>
						Return to your previous page or go to Home page by clicking the
						button below.
					</Typography>

					<Box
						component="img"
						src={restricted}
						sx={{
							height: '100%',
							width: '100%',
							mx: 'auto',
							my: { xs: 5, sm: 5 },
						}}
					/>

					<Button
						to="/home"
						size="large"
						variant="contained"
						component={RouterLink}
					>
						Go to Home
					</Button>
				</Box>
			</Container>
		</RootStyle>
	);
}
