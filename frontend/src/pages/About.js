import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import UserWindow from '../utils/UserWindow';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import plantaza1 from '../images/plantaza1.JPG';
import plantaza2 from '../images/plantaza2.JPG';

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<a color="inherit" href="http://maline.yolasite.com/">
				Farma voća "Adian"
			</a>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function About() {
	const screen = UserWindow();
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				paddingTop: 9,
				paddingLeft: screen.dynamicWidth < 600 ? 0 : 22,
			}}
		>
			<CssBaseline />
			<main>
				{/* Hero unit */}
				<Box
					sx={{
						bgcolor: 'background.paper',
						pt: 2,
						pb: 2,
					}}
				>
					<Container maxWidth="md">
						<Typography
							component="h5"
							variant="h5"
							align="center"
							color="text.primary"
							gutterBottom
						>
							O nama
						</Typography>
						<Typography
							variant="h6"
							color="text.secondary"
							paragraph
							align="justify"
						>
							Porodično poljoprivredno gazdinstvo Adilović je plantaža i
							rasadnik jagodičastog i bobičastog voća, koja se prostire na
							površini od jednog hektara. Gazdinstvo se nalazi u mjestu Vranjska
							u općini Bosanska Krupa u podnožju planine Grmeč.
						</Typography>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={6}>
									<Card>
										<CardMedia
											component="img"
											height="100%"
											image={plantaza1}
											alt="green iguana"
										/>
									</Card>
								</Grid>
								<Grid item xs={12} sm={12} md={6}>
									<Card>
										<CardMedia
											component="img"
											height="100%"
											image={plantaza2}
											alt="green iguana"
										/>
									</Card>
								</Grid>
								<Grid item xs={6} container justifyContent="flex-end">
									<Button
										to="/products"
										size="large"
										variant="contained"
										component={RouterLink}
									>
										Ponuda sadnica
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										to="/signup"
										size="large"
										variant="outlined"
										component={RouterLink}
									>
										Registracija korisnika
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Container>
				</Box>
				<Container maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={1}>
						<Grid item xs={12}></Grid>
					</Grid>
				</Container>
			</main>
			{/* Footer */}
			<Box sx={{ bgcolor: 'background.paper' }} component="footer">
				<Typography
					variant="subtitle1"
					align="center"
					color="text.secondary"
					component="p"
				>
					Možete nas kontaktirati na 062 261 353
				</Typography>
				<Copyright />
			</Box>
			{/* End footer */}
		</Box>
	);
}
