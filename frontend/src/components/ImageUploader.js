import React, { useState, useEffect } from 'react';
import { Button, Container, Card, CardMedia } from '@mui/material';
import { Box } from '@mui/system';
import useAxiosProducts from '../utils/useAxiosProducts';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const ImageUploader = (props) => {
	const { url, setUrl } = props;
	const [publicId, setPublicId] = useState([]);
	const buttons = [1, 2, 3];
	const [imageLoaded, setImageLoaded] = useState(false);
	const cloudinaryDB = useAxiosProducts();

	const extractPublicId = (imageUrl) => {
		const lastSlash = imageUrl.lastIndexOf('/');
		const lastDot = imageUrl.lastIndexOf('.');
		const extractedValue = imageUrl.substring(lastSlash + 1, lastDot);
		publicId.push(extractedValue);
		setPublicId([...publicId]);
	};

	useEffect(() => {
		url.forEach((element) => {
			extractPublicId(element);
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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
				// url.push(data.url)
				setUrl([...url, data.url]);
				extractPublicId(data.url);
			})
			.catch((err) => console.log(err));
	};

	const discardImage = (imageIndex) => {
		cloudinaryDB.deleteCloudinaryImage(publicId[imageIndex]);
		url.splice(imageIndex, 1);
		publicId.splice(imageIndex, 1);
		setPublicId([...publicId]);
		setUrl([...url]);
	};

	return (
		<Container maxWidth="xs">
			{buttons.map((number, index) => {
				return (
					<div key={index}>
						{url[index] ? (
							<Box style={{ marginTop: 10 }}>
								<Card sx={{ maxHeight: 255 }}>
									<CardMedia>
										<img
											onLoad={() => setImageLoaded(true)}
											src={url[index].replace('upload/', 'upload/w_600/')}
											style={{ height: '100%', width: '100%' }}
											alt="not found"
										/>
										{!imageLoaded && (
											<Stack
												style={{
													display: 'flex',
													justifyContent: 'center',
												}}
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
									onClick={() => discardImage(index)}
									variant="contained"
									color="warning"
									component="label"
								>
									{`Izbriši sliku ${number}`}
								</Button>
							</Box>
						) : (
							<div style={{ margin: 5 }}>
								<Button
									key={index}
									fullWidth
									variant="contained"
									component="label"
									color="success"
								>
									{`Odaberi sliku ${number}`}
									<input type="file" hidden onChange={(e) => uploadImage(e)} />
								</Button>
							</div>
						)}
					</div>
				);
			})}
		</Container>
	);
};
export default ImageUploader;
