import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import Error from './pages/Error';
import Address from './pages/Address';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollToTop from './utils/ScrollToTop';
import Restricted from './pages/Restricted';
import Products from './pages/Products';
import CheckOut from './pages/CheckOut';
import CreateProduct from './pages/CreateProduct';
import ProductPage from './pages/ProductPage';
import Orders from './pages/Orders';
import Print from './utils/Print';
import ProductsList from './pages/ProductsList';
import ProductEdit from './pages/ProductEdit';
import About from './pages/About';

const App = () => {
	const [darkMode, setDarkMode] = useState(false);
	const theme = createTheme({
		palette: {
			mode: `${darkMode ? 'dark' : 'light'}`,
			primary: {
				main: `${darkMode ? '#37718E' : '#648381'}`,
			},
			secondary: {
				main: `${darkMode ? '#254E70' : '#FFBF46'}`,
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<CssBaseline />
				<ScrollToTop />
				<Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
				<Switch>
					<Route component={Login} path="/" exact />
					<Route component={Signup} path="/signup" exact />
					<Route component={ProductPage} path="/product" exact />
					<Route component={CheckOut} path="/checkout" exact />
					<Route component={Address} path="/address" exact />
					<Route component={Products} path="/products" exact />
					<Route component={Print} path="/order" exact />
					<Route component={About} path="/about" exact />
					<PrivateRoute component={UserProfile} path="/profile" exact />
					<PrivateRoute component={Restricted} path="/restricted" exact />
					<PrivateRoute component={Orders} path="/orders" exact />
					<AdminRoute component={CreateProduct} path="/create_product" exact />
					<AdminRoute component={ProductEdit} path="/product_edit" exact />
					<AdminRoute component={ProductsList} path="/products_list" exact />
					<AdminRoute component={Users} path="/users" exact />
					<Route component={Error} path="/*" />
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
