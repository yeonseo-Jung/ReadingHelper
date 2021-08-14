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
import customAxios from './customAxios';
import { NaverHandler, KakaoHandler } from './function';

function App() {
	const [item, setItem] = useState('');
	const callback = (data) => {
		setItem(data);
	};
	useEffect(() => {
		customAxios('/1', callback);
	}, []);

	const [signIn, setSingIn] = useState(false);
	const [name, setName] = useState('');
	const handleLogout = () => {
		setSingIn(false);
		setName('');
	};
	const getUserInfo = (data) => {
		setSingIn(true);
		if (data.nickname) {
			setName(data.nickname);
		} else {
			setName('사용자');
		}
	};
	useEffect(() => {
		console.log('log', name, signIn);
	}, [getUserInfo]);

	useEffect(() => {}, [handleLogout]);
	return (
		<Grid className="app">
			<Header userChanged={name} handleLogout={handleLogout} />
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route path="/join" component={Join} />
			<Route path="/login/callback/kakao/" render={() => <KakaoHandler getUserInfo={getUserInfo} />} />
			<Route path="/login/callback/naver/" render={() => <NaverHandler getUserInfo={getUserInfo} />} />
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
