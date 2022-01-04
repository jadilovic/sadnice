import React, { useState } from 'react';
// import { HashRouter, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Edit from './pages/Edit';
import UserProfile from './pages/UserProfile';
import Error from './pages/Error';
import Address from './pages/Address';
import PrivateRoute from './components/PrivateRoute';
import TeacherRoute from './components/TeacherRoute';
import Navbar from './components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollToTop from './utils/ScrollToTop';
import Restricted from './pages/Restricted';
import Products from './pages/Products';
import CheckOut from './pages/CheckOut';
import CreateProduct from './pages/CreateProduct';
import Iframely from './pages/Iframe';

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
					<Route component={CheckOut} path="/checkout" exact />
					<Route component={Address} path="/address" exact />
					<PrivateRoute component={Home} path="/home" exact />
					<PrivateRoute component={Products} path="/materials" exact />
					<PrivateRoute component={CreateProduct} path="/products" exact />
					<TeacherRoute component={Iframely} path="/stats" exact />
					<TeacherRoute component={Edit} path="/edit" exact />
					<TeacherRoute component={Users} path="/users" exact />
					<TeacherRoute component={UserProfile} path="/profile" exact />
					<PrivateRoute component={Restricted} path="/restricted" />
					<Route component={Error} path="/*" />
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
