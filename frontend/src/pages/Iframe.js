import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MediaControlCard() {
	const theme = useTheme();

	return (
		<Card sx={{ display: 'flex' }}>
			<Box
				sx={{
					paddingTop: 20,
					paddingLeft: 30,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component="div" variant="h5">
						Live From Space
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						Mac Miller
					</Typography>
				</CardContent>
				<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
					<IconButton aria-label="previous">
						{theme.direction === 'rtl' ? (
							<SkipNextIcon />
						) : (
							<SkipPreviousIcon />
						)}
					</IconButton>
					<IconButton aria-label="play/pause">
						<PlayArrowIcon sx={{ height: 38, width: 38 }} />
					</IconButton>
					<IconButton aria-label="next">
						{theme.direction === 'rtl' ? (
							<SkipPreviousIcon />
						) : (
							<SkipNextIcon />
						)}
					</IconButton>
				</Box>
			</Box>
			<CardMedia
				component="img"
				sx={{ width: 151 }}
				image="/static/images/cards/live-from-space.jpg"
				alt="Live from space album cover"
			/>
		</Card>
	);
}

// import React, { useEffect, useState } from 'react';
// const KEY = 'MD5_HASH_OF_YOUR_API_KEY';

// export default function Iframely(props) {
// 	const [error, setError] = useState(null);
// 	const [isLoaded, setIsLoaded] = useState(false);
// 	const [html, setHtml] = useState({
// 		__html: '<div />',
// 	});
// 	const url = 'https://www.yahoo.com';

// 	return (
// 		<div>
// 			<body>
// 				<iframe
// 					title="boy"
// 					src="https://answergarden.ch/"
// 					width="100%"
// 					height="500"
// 					allowfullscreen
// 					sandbox
// 				>
// 					<p>
// 						<a href="/en-US/docs/Glossary">
// 							Fallback link for browsers that don't support iframes
// 						</a>
// 					</p>
// 				</iframe>
// 			</body>
// 		</div>
// 	);
// }
