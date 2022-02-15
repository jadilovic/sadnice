import React, { useState, useEffect } from 'react';
import useAxiosProducts from '../utils/useAxiosProducts';
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
import LoadingPage from '../components/LoadingPage';

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
	const productDB = useAxiosProducts();
	const [error, setError] = useState(null);
	const [fieldErrors, setFieldErrors] = useState({});
	const screen = UserWindow();
	const [loading, setLoading] = useState(true);
	const [productEdit, setProductEdit] = useState({
		title: '',
		description: '',
		imageUrl: [],
		price: 0,
		category: '',
		packaging: '',
		age: 0,
		available: true,
	});
	const [imageUrl, setImageUrl] = useState([]);

	const changeValue = (event) => {
		console.log(event.target.name);
		console.log(event.target.value);
		setProductEdit({ ...productEdit, [event.target.name]: event.target.value });
	};

	const getProductObject = async (productId) => {
		const data = await productDB.getProduct(productId);
		console.log(data.product);
		setImageUrl(data.product.imageUrl);
		setProductEdit(data.product);
		setLoading(false);
	};

	useEffect(() => {
		const productId = localStorage.getItem('currentProductId');
		getProductObject(productId);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleSubmit = (event) => {
		event.preventDefault();
		productEdit.imageUrl = imageUrl;
		submitData(productEdit);
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
			await productDB.updateProduct(productData);
			history.push('/products_list');
		} catch (err) {
			console.log(err.data);
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

	console.log('product edit category : ', productEdit);

	if (loading) {
		return <LoadingPage />;
	}

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
					Izmjena podataka sadnice
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
								value={productEdit.title}
								onChange={changeValue}
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
								value={productEdit.price}
								onChange={changeValue}
							/>
						</Grid>
						<Grid item xs={12} sm={9}>
							<FormControl fullWidth>
								<InputLabel>Category</InputLabel>
								{console.log(productEdit.category)}
								<Select
									name="category"
									value={productEdit.category}
									label="Category"
									onChange={changeValue}
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
								<Select
									name="age"
									value={productEdit.age}
									label="Age"
									onChange={changeValue}
								>
									<MenuItem value={1}>Jedna</MenuItem>
									<MenuItem value={2}>Dvije</MenuItem>
									<MenuItem value={3}>Dvije</MenuItem>
									<MenuItem value={4}>Četiri</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={9}>
							<FormControl fullWidth>
								<InputLabel>Packaging</InputLabel>
								<Select
									name="packaging"
									value={productEdit.packaging}
									label="Packaging"
									onChange={changeValue}
								>
									<MenuItem value="Kontejnerske">Kontejnerske</MenuItem>
									<MenuItem value="Golih žila">Golih žila</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={3}>
							<FormControl fullWidth>
								<InputLabel>Raspoloživost</InputLabel>
								<Select
									name="available"
									value={productEdit.available}
									label="Raspoloživost"
									onChange={changeValue}
								>
									<MenuItem value={true}>Na stanju</MenuItem>
									<MenuItem value={false}>Rasprodano</MenuItem>
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
								value={productEdit.description}
								onChange={changeValue}
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
						Izmjeni sadnicu u ponudi
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link
								style={{ color: '#648381' }}
								to="/products_list"
								variant="body2"
							>
								Lista kreiranih sadnica
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
