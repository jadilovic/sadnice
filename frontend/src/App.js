import React, { useState } from 'react';
// import { HashRouter, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import Signup from './pages/Signup';
// import Home from './pages/Home';
// import Edit from './pages/Edit';
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
import Iframely from './pages/Iframe';
import OrderSummary from './pages/OrderSummary';

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
					<Route component={Products} path="/materials" exact />
					<Route component={OrderSummary} path="/order" exact />
					<PrivateRoute component={UserProfile} path="/profile" exact />
					<PrivateRoute component={Restricted} path="/restricted" exact />
					<AdminRoute component={CreateProduct} path="/products" exact />
					<AdminRoute component={Iframely} path="/stats" exact />
					{/* <AdminRoute component={Edit} path="/edit" exact /> */}
					<AdminRoute component={Users} path="/users" exact />
					<Route component={Error} path="/*" />
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
