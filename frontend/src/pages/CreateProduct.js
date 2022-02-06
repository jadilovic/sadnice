import React, { useState } from 'react';
import useAxiosRequest from '../utils/useAxiosRequest';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box, Alert } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ImageUploader from '../components/ImageUploader';
import UserWindow from '../utils/UserWindow';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import categories from '../data/categories';

function Copyright() {
	return (
		<Typography
			paddingTop={5}
			variant="body2"
			color="text.secondary"
			align="center"
		>
			{`Products Online ${new Date().getFullYear()}.`}
		</Typography>
	);
}

const CreateProduct = () => {
	const history = useHistory();
	const mongoDB = useAxiosRequest();
	const [error, setError] = useState(null);
	const [fieldErrors, setFieldErrors] = useState({});
	const [imageUrl, setImageUrl] = useState([]);
	const screen = UserWindow();
	const [age, setAge] = useState(1);
	const [category, setCategory] = useState('Malina');
	const [packaging, setPackaging] = useState('Golih žila');

	const changeAge = (event) => {
		setAge(event.target.value);
	};

	const changeCategory = (event) => {
		setCategory(event.target.value);
	};

	const changePackaging = (event) => {
		setPackaging(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		const newProductData = {
			title: data.get('title'),
			price: data.get('price'),
			category: category,
			age: age,
			packaging: packaging,
			description: data.get('description'),
			imageUrl: imageUrl,
			available: true,
		};
		submitData(newProductData);
	};

	const settingErrors = (errors) => {
		let initialErrors = {
			title: { error: false, msg: '' },
			price: { error: false, msg: '' },
			description: { error: false, msg: '' },
			imageUrl: { error: false, msg: '' },
		};
		let errorsList = errors.replace('ValidationError: ', '');
		errorsList = errorsList.split(', ');
		errorsList.map((item) => {
			const errorItem = item.split('-');
			return (initialErrors[errorItem[0]] = {
				error: true,
				msg: errorItem[1],
			});
		});
		setFieldErrors(initialErrors);
		initialErrors = {};
		setError('');
	};

	const submitData = async (productData) => {
		console.log(productData);
		try {
			await mongoDB.createProduct(productData);
			history.push('/products');
		} catch (err) {
			console.log(err.response);
			try {
				if (err.response.data.msg.startsWith('ValidationError: ')) {
					settingErrors(err.response.data.msg);
				} else {
					setFieldErrors({});
					setError(err.response.data.msg);
				}
			} catch (error) {
				console.log('ERROR : ', error);
				setFieldErrors({});
				setError('Network error. Try again later.');
			}
		}
	};

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 9,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingLeft: screen.dynamicWidth < 600 ? 2 : 24,
					paddingRight: 2,
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: '#648381' }}>
					<CategoryIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Create New Product
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					{error && (
						<Box
							sx={{
								paddingTop: 2,
								paddingBottom: 2,
								bgcolor: 'background.paper',
							}}
						>
							<Alert severity="error">{error}</Alert>
						</Box>
					)}
					<Grid container spacing={2}>
						<Grid item xs={12} sm={9}>
							<TextField
								error={fieldErrors?.title?.error ? true : false}
								helperText={fieldErrors?.title?.msg}
								name="title"
								required
								fullWidth
								id="title"
								label="Title"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<TextField
								error={fieldErrors?.price?.error ? true : false}
								helperText={fieldErrors?.price?.msg}
								required
								fullWidth
								id="price"
								label="Price"
								name="price"
								type="number"
								InputProps={{ inputProps: { min: 1, max: 100 } }}
							/>
						</Grid>
						<Grid item xs={12} sm={9}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Category</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={category}
									label="Category"
									onChange={changeCategory}
								>
									{categories.map((category, index) => {
										return (
											<MenuItem key={index} value={category}>
												{category}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={3}>
							<FormControl fullWidth>
								<InputLabel>Age</InputLabel>
								<Select value={age} label="Age" onChange={changeAge}>
									<MenuItem value={1}>Jedna</MenuItem>
									<MenuItem value={2}>Dvije</MenuItem>
									<MenuItem value={3}>Dvije</MenuItem>
									<MenuItem value={4}>Četiri</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel>Packaging</InputLabel>
								<Select
									value={packaging}
									label="Packaging"
									onChange={changePackaging}
								>
									<MenuItem value="Kontejnerske">Kontejnerske</MenuItem>
									<MenuItem value="Golih žila">Golih žila</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<TextField
								multiline
								minRows={4}
								error={fieldErrors?.description?.error ? true : false}
								helperText={fieldErrors?.description?.msg}
								required
								fullWidth
								id="description"
								label="Description"
								name="description"
							/>
						</Grid>
						<Grid item xs={12}>
							{fieldErrors?.imageUrl?.msg && (
								<Box
									sx={{
										paddingTop: 1,
										paddingBottom: 1,
										bgcolor: 'background.paper',
									}}
								>
									<Alert severity="error">{fieldErrors?.imageUrl?.msg}</Alert>
								</Box>
							)}
							<ImageUploader url={imageUrl} setUrl={setImageUrl} />
						</Grid>
					</Grid>
					<Button
						fullWidth
						type="submit"
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Create Product
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link style={{ color: '#648381' }} to="/products" variant="body2">
								Go to products
							</Link>
						</Grid>
					</Grid>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Box>
		</Container>
	);
};

export default CreateProduct;
