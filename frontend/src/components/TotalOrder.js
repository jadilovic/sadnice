import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const TotalOrder = (props) => {
	const totalOrder = props.totalOrder;
	return (
		<Card>
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
