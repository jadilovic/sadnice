import React, { useState } from 'react';
import { Button, Container, Card, CardMedia } from '@mui/material';
import { Box } from '@mui/system';
import useAxiosProducts from '../utils/useAxiosProducts';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const ImageUploader = (props) => {
	const { url, setUrl } = props;
	const [publicId, setPublicId] = useState('');
	const [imageLoaded, setImageLoaded] = useState(false);
	const cloudinaryDB = useAxiosProducts();

	const extractPublicId = (imageUrl) => {
		const lastSlash = imageUrl.lastIndexOf('/');
		const lastDot = imageUrl.lastIndexOf('.');
		const extractedValue = imageUrl.substring(lastSlash + 1, lastDot);
		setPublicId(extractedValue);
	};

	const uploadImage = (e) => {
		const data = new FormData();
		const image = e.target.files[0];
		data.append('file', image);
		data.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`);
		data.append('cloud_name', 'adilovic');
		fetch('  https://api.cloudinary.com/v1_1/adilovic/image/upload', {
			method: 'post',
			body: data,
		})
			.then((resp) => resp.json())
			.then((data) => {
				setUrl(data.url);
				extractPublicId(data.url);
			})
			.catch((err) => console.log(err));
	};

	const discardImage = () => {
		cloudinaryDB.deleteCloudinaryImage(publicId);
		setUrl('');
	};

	return (
		<Container maxWidth="xs">
			{url ? (
				<Box>
					<Card sx={{ maxHeight: 255 }}>
						<CardMedia>
							<img
								onLoad={() => setImageLoaded(true)}
								src={url.replace('upload/', 'upload/w_600/')}
								style={{ height: '100%', width: '100%' }}
								alt="not found"
							/>
							{!imageLoaded && (
								<Stack
									style={{ display: 'flex', justifyContent: 'center' }}
									sx={{ color: 'grey.500' }}
									spacing={2}
									direction="row"
								>
									<CircularProgress color="secondary" />
									<CircularProgress color="success" />
									<CircularProgress color="inherit" />
								</Stack>
							)}
						</CardMedia>
					</Card>
					<Button
						size="small"
						style={{ marginTop: 2 }}
						fullWidth
						onClick={() => discardImage()}
						variant="contained"
						color="warning"
						component="label"
					>
						Discard this image
					</Button>
				</Box>
			) : (
				<Button fullWidth variant="contained" component="label" color="success">
					Select Image
					<input type="file" hidden onChange={(e) => uploadImage(e)} />
				</Button>
			)}
		</Container>
	);
};
export default ImageUploader;
