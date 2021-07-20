import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Home, Login, Join } from './pages';
import { Header } from './components';
import './scss/main.scss';

function App() {
	return (
		<Grid className="app">
			<Header />
			<Route path="/" component={Home} exact />
			<Route path="/login" component={Login} />
			<Route path="/join" component={Join} />
		</Grid>
	);
}

export default App;
