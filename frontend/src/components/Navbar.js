import React, { useEffect, useState } from 'react';
import { getUserData, isAuthenticated } from '../auth/Authentication';
import { useHistory } from 'react-router-dom';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import bildit from '../images/bildit.png';
import seedling from '../images/seedling.png';
import UserMenu from './UserMenu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import UserWindow from '../utils/UserWindow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import raspberry from '../images/raspberry.png';
import tayberry from '../images/tayberry.png';
import currant from '../images/currant.png';
import blackberry from '../images/blackberry.png';
import gooseberry from '../images/gooseberry.png';
import berries from '../images/berries.png';
import fruits from '../images/fruits.png';
import strawberry from '../images/strawberry.png';
import aronia from '../images/aronia.png';
import goji from '../images/goji.png';

const drawerWidth = 180;

const Navbar = (props) => {
	const screen = UserWindow();
	const { setDarkMode, darkMode } = props;
	const history = useHistory();
	const [authenticated, setAuthenticated] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [menuClicked, setMenuClicked] = useState(false);
	let drawerMenu = [
		{
			section: 'Home',
			icon: berries,
			linkToSection: '/products',
			permission: 'guest',
		},
		{
			section: 'Malina',
			icon: raspberry,
			linkToSection: '/products',
			permission: 'guest',
		},
		{
			section: 'Ribizla',
			icon: currant,
			linkToSection: '/products',
			permission: 'guest',
		},
		{
			section: 'Kupina',
			icon: blackberry,
			linkToSection: '/products',
			permission: 'guest',
		},
		{
			section: 'Ogrozd',
			icon: gooseberry,
			linkToSection: '/products',
			permission: 'guest',
		},
		{
			section: 'Tayberry',
			icon: tayberry,
			linkToSection: '/products',
			permission: 'guest',
		},
		{
			section: 'Jagoda',
			icon: strawberry,
			linkToSection: '/products',
			permission: 'guest',
		},
		{
			section: 'Aronija',
			icon: aronia,
			linkToSection: '/products',
			permission: 'guest',
		},
		{
			section: 'Gođi',
			icon: goji,
			linkToSection: '/products',
			permission: 'guest',
		},
		{
			section: 'Ostalo',
			icon: fruits,
			linkToSection: '/products',
			permission: 'guest',
		},
	];
	let drawerAdmin = [
		{
			section: 'Profil',
			icon: <PersonIcon />,
			linkToSection: '/profile',
			permission: 'member',
		},
		{
			section: 'Korisnici',
			icon: <PeopleOutlineIcon />,
			linkToSection: '/users',
			permission: 'admin',
		},
		{
			section: 'Narudžbe',
			icon: <FormatListNumberedIcon />,
			linkToSection: '/orders',
			permission: 'admin',
		},
		{
			section: 'Sadnice',
			icon: <LibraryBooksIcon />,
			linkToSection: '/create_product',
			permission: 'admin',
		},
		{
			section: 'Tasks',
			icon: <QueryStatsIcon />,
			linkToSection: '/tasks',
			permission: 'member',
		},
	];
	let role = '';
	if (isAuthenticated()) {
		role = getUserData().role;
		if (role === 'member') {
			drawerAdmin = drawerAdmin.filter((menu) => menu.permission === 'member');
		}
	} else {
		drawerAdmin = [];
	}

	const handleClickAway = () => {
		if (menuClicked) {
			setMenuClicked(false);
		} else {
			if (screen.dynamicWidth < 600) {
				setDrawerOpen(false);
			}
		}
	};

	const handleDrawerToggle = () => {
		setMenuClicked(true);
		setDrawerOpen(!drawerOpen);
	};

	if (authenticated === null) {
		setAuthenticated(isAuthenticated());
	}

	useEffect(() => {
		if (screen.dynamicWidth < 600) {
			setDrawerOpen(false);
		} else {
			setDrawerOpen(true);
		}
	}, [screen]);

	useEffect(() => {
		history.listen(() => {
			console.log(window.location.pathname);
			setAuthenticated(isAuthenticated());
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const toggleTheme = () => {
		if (darkMode) {
			setDarkMode(false);
		} else {
			setDarkMode(true);
		}
	};

	const handleMenuClick = (menuLink, category) => {
		if (screen.dynamicWidth < 600) {
			setDrawerOpen(false);
		}
		localStorage.setItem('category', category);
		history.push(menuLink);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						paddingRight={2}
						paddingTop={1.25}
					>
						<Link
							component="button"
							variant="body2"
							onClick={() => handleMenuClick('/products', 'Home')}
							underline="none"
							//	href="/products"
							color="white"
						>
							<img
								style={{ width: '100%', height: 40 }}
								src={seedling}
								alt="sadnice logo"
							/>
						</Link>
					</Typography>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Sadnice
					</Typography>
					<Typography>
						<IconButton
							sx={{ ml: 1 }}
							onClick={() => toggleTheme()}
							color="inherit"
						>
							{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Typography>
					{authenticated ? (
						<UserMenu />
					) : (
						<Link
							underline="none"
							component="button"
							variant="body2"
							color="white"
							onClick={() => handleMenuClick('/')}
						>
							<Typography variant="h6" component="div">
								{'Prijava'}
							</Typography>
						</Link>
					)}
				</Toolbar>
			</AppBar>
			{/* {authenticated && ( */}
			<ClickAwayListener onClickAway={handleClickAway}>
				<Drawer
					variant="persistent"
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						[`& .MuiDrawer-paper`]: {
							width: drawerWidth,
							boxSizing: 'border-box',
						},
					}}
					open={drawerOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<Toolbar />
					<Box sx={{ overflow: 'auto' }}>
						<List>
							{drawerMenu.map((menuItem, index) => (
								<ListItem
									onClick={() =>
										handleMenuClick(menuItem.linkToSection, menuItem.section)
									}
									button
									key={index}
								>
									{/* <ListItemIcon>{menuItem.icon}</ListItemIcon> */}
									<img
										style={{ width: '30px', height: '30px', marginRight: 25 }}
										src={menuItem.icon}
										alt="icon instead"
									/>
									<ListItemText primary={menuItem.section} />
								</ListItem>
							))}
						</List>
						<Divider />
						<List>
							{drawerAdmin.map((item, index) => (
								<ListItem
									button
									key={index}
									onClick={() =>
										handleMenuClick(item.linkToSection, item.section)
									}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.section} />
								</ListItem>
							))}
						</List>
					</Box>
				</Drawer>
			</ClickAwayListener>
			{/* )} */}
		</Box>
	);
};

export default Navbar;
