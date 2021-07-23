import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Home, Login, Join, MyPage, Report, UserEdit, MyLibrary, BookCalendar } from './pages';
import { Header } from './components';
import './scss/main.scss';

function App() {
	return (
		<Grid className="app">
			<Header />
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/join" component={Join} />
			<Route path="/mypage" component={MyPage} />
			<Route path="/report" component={Report} />
			<Route path="/mylib" component={MyLibrary} />
			<Route path="/calendar" component={BookCalendar} />
		</Grid>
	);
}

export default App;
