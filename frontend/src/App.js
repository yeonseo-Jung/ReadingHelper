import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Home, Auth } from './pages';

function App() {
	return (
		<Grid className="app">
			<Route exact path="/" component={Home} />
			<Route exact path="/auth" component={Auth} />
		</Grid>
	);
}

export default App;
