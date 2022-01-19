import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Divider } from '@mui/material';

const TotalOrder = (props) => {
	const totalOrder = props.totalOrder;
	return (
		<Card
			sx={{
				marginBottom: 2,
				marginLeft: { sm: 0, md: 2, lg: 2 },
				display: 'flex',
				flexDirection: { xs: 'row', md: 'row', lg: 'row' },
				// alignItems: 'center',
				overflow: 'hidden',
				borderRadius: '12px',
				boxShadow: 1,
				fontWeight: 'bold',
				maxHeight: '100%',
				maxWidth: '100%',
			}}
		>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography align="left">Sadnica ukupno:</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography align="right">{totalOrder} KM</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography align="left">Dostava:</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography align="right">10 KM</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider orientation="horizontal" flexItem />
					</Grid>
					<Grid item xs={6}>
						<Typography style={{ fontWeight: 600 }} align="left">
							Sve ukupno:
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography style={{ fontWeight: 600 }} align="right">
							{totalOrder + 10} KM
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default TotalOrder;
