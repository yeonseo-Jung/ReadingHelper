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
import { NaverHandler, KakaoHandler, LoginHandler } from './function';

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
	const [loginInfo, setLoginInfo] = useState('');
	const handleLogout = () => {
		setSingIn(false);
		setName('');
	};
	const getUserInfo = (data) => {
		setLoginInfo('');
		setSingIn(true);
		if (data.name) {
			setName(data.name);
		} else {
			setName('사용자');
		}
	};
	const getLoginInfo = (data) => {
		setLoginInfo(data);
	};
	useEffect(() => {
		console.log('log', name, signIn);
	}, [getUserInfo]);

	useEffect(() => {
		console.log('log', loginInfo);
	}, [handleLogout, getLoginInfo]);
	return (
		<Grid className="app">
			<Header userChanged={name} handleLogout={handleLogout} />
			<Route exact path="/" component={Home} />
			<Route exact path="/login" render={() => <Login getLoginInfo={getLoginInfo} />} />
			<Route path="/join" render={() => <Join getLoginInfo={getLoginInfo} />} />
			<Route path="/login/callback/kakao/" render={() => <KakaoHandler getUserInfo={getUserInfo} />} />
			<Route path="/login/callback/naver/" render={() => <NaverHandler getUserInfo={getUserInfo} />} />
			<Route
				path="/login/callback/own"
				render={() => <LoginHandler userInfo={loginInfo} getUserInfo={getUserInfo} />}
			/>
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
