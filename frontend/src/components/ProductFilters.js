import React, { useState } from 'react';
import useAxiosProducts from '../utils/useAxiosProducts';
// material
import {
	Box,
	Stack,
	Button,
	Drawer,
	Divider,
	Checkbox,
	FormControl,
	Typography,
	MenuItem,
	ListItemText,
} from '@mui/material';
import ages from '../data/ages';
import packaging from '../data/packaging';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

export default function ProductFilters(props) {
	const mongoDB = useAxiosProducts();
	const {
		setCount,
		setCurrentPage,
		category,
		products,
		setFilteredProducts,
		isOpenFilter,
		onOpenFilter,
		onCloseFilter,
		setSelectedFilters,
	} = props;
	const [selectedAge, setSelectedAge] = useState([]);
	const [selectedPackaging, setSelectedPackaging] = useState([]);

	const handleChange = (name, value) => {
		if (name === 'pack') {
			if (selectedPackaging.findIndex((i) => i === value) > -1) {
				const index = selectedPackaging.indexOf(value);
				selectedPackaging.splice(index, 1);
				setSelectedPackaging([...selectedPackaging]);
			} else {
				setSelectedPackaging([...selectedPackaging, value]);
			}
		} else {
			if (selectedAge.findIndex((i) => i === value) > -1) {
				const index = selectedAge.indexOf(value);
				selectedAge.splice(index, 1);
				setSelectedAge([...selectedAge]);
			} else {
				setSelectedAge([...selectedAge, value]);
			}
		}
	};

	const getTotalPageCount = (productsArrLength) => {
		return Math.ceil(productsArrLength / 6);
	};

	const handleFilter = async () => {
		console.log(selectedAge, selectedPackaging);
		if (selectedAge.length > 0 || selectedPackaging.length > 0) {
			const filteredProducts = await mongoDB.getAllProducts(
				// --- this is get request
				selectedAge,
				[category],
				selectedPackaging
			);
			const totalPageCount = getTotalPageCount(filteredProducts.length);
			console.log('total page count : ', totalPageCount);
			setCount(totalPageCount);
			setCurrentPage(1);
			setFilteredProducts(filteredProducts);
			let filtersMessage = '';
			if (filteredProducts.length > 0) {
				if (selectedAge.join('')) {
					filtersMessage = filtersMessage.concat(
						'Sadnice starosti: ' + selectedAge.join(', ') + ' godine. | '
					);
				}
				if (selectedPackaging.join('')) {
					filtersMessage = filtersMessage.concat(
						'Filteri pakovanja: ' + selectedPackaging.join(', ')
					);
				}
			}
			setSelectedFilters(filtersMessage);
		}
		onCloseFilter();
	};

	const clearFilter = () => {
		setSelectedPackaging([]);
		setSelectedAge([]);
		const totalPageCount = getTotalPageCount(products.length);
		setCount(totalPageCount);
		setCurrentPage(1);
		setFilteredProducts(products);
		setSelectedFilters('');
		localStorage.removeItem('category');
		onCloseFilter();
	};

	return (
		<>
			<IconButton
				onClick={onOpenFilter}
				size="large"
				edge="start"
				color="inherit"
				aria-label="open drawer"
				sx={{ mr: 2 }}
			>
				<FilterListIcon />
			</IconButton>
			<IconButton
				onClick={() => clearFilter()}
				size="large"
				edge="start"
				color="inherit"
				aria-label="open drawer"
				sx={{ mr: 2 }}
			>
				<ClearAllIcon />
			</IconButton>
			<Drawer
				anchor="right"
				open={isOpenFilter}
				onClose={onCloseFilter}
				PaperProps={{
					sx: { width: 280, border: 'none', overflow: 'hidden' },
				}}
			>
				<Stack sx={{ paddingTop: 9, paddingLeft: 2 }}>
					<Typography variant="subtitle1" sx={{ ml: 1 }}>
						Starost sadnica
					</Typography>
					<FormControl sx={{ m: 1 }}>
						{ages.map((age, index) => (
							<MenuItem key={age.name} value={age.value}>
								<Checkbox
									onChange={() => handleChange('age', age.value)}
									checked={selectedAge.findIndex((i) => i === age.value) > -1}
								/>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
									}}
								>
									<div style={{ marginLeft: 20 }}>
										<ListItemText primary={age.name} />
									</div>
								</div>
							</MenuItem>
						))}
					</FormControl>
				</Stack>

				<Divider />

				<Stack sx={{ paddingLeft: 2, paddingTop: 4 }}>
					<Typography variant="subtitle1" sx={{ ml: 1 }}>
						Pakovanje sadnica
					</Typography>
					<FormControl sx={{ m: 1 }}>
						{packaging.map((pack, index) => (
							<MenuItem key={index} value={pack.name}>
								<Checkbox
									onChange={() => handleChange('pack', pack.name)}
									checked={
										selectedPackaging.findIndex((s) => s === pack.name) > -1
									}
								/>
								<ListItemText primary={pack.name} />
							</MenuItem>
						))}
					</FormControl>
				</Stack>
				<Divider />

				<Box sx={{ p: 2 }}>
					<Button
						fullWidth
						size="large"
						type="submit"
						color="success"
						variant="contained"
						onClick={() => handleFilter()}
					>
						Pokreni filter
					</Button>
				</Box>
				<Box sx={{ p: 2 }}>
					<Button
						fullWidth
						size="large"
						type="submit"
						color="secondary"
						variant="contained"
						onClick={() => clearFilter()}
					>
						Očisti filter
					</Button>
				</Box>
			</Drawer>
		</>
	);
}
