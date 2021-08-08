import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import {
	Home,
	Login,
	Join,
	MyPage,
	Report,
	ReportInfo,
	ReportWrite,
	UserEdit,
	MyLibrary,
	BookCalendar,
	BookInfo,
	Search,
} from './pages';
import { Header } from './components';
import './scss/main.scss';

function App() {
	const [message, setMessage] = useState('');

	useEffect(() => {
		fetch('/api/hello')
			.then((response) => response.text())
			.then((m) => {
				setMessage(message);
			});
	}, []);
	return (
		<Grid className="app">
			<Header />
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/join" component={Join} />
			<Switch>
				<Route path="/mypage/edit" component={UserEdit} />
				<Route exact path="/mypage" component={MyPage} />
				<Route path="/report/:id/edit" component={ReportWrite} />
				<Route path="/report/:id" component={ReportInfo} />
				<Route exact path="/report" component={Report} />
			</Switch>
			<Route exact path="/mylib" component={MyLibrary} />
			<Route exact path="/book_info/:id" component={BookInfo} />
			<Route path="/calendar" component={BookCalendar} />
			<Route path="/search" component={Search} />
		</Grid>
	);
}

export default App;
