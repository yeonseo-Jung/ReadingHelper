import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { NaverHandler, KakaoHandler } from './function';

function App() {
	const [signIn, setSingIn] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [social, setSocial] = useState('');
	const [uid, setUid] = useState();

	const handleLogout = () => {
		setSingIn(false);
		setName(null);
		setEmail('');
		setSocial('');
		setUid(null);
	};
	const getUserInfo = (data, sc) => {
		setSingIn(true);
		if (data.name) {
			setName(data.name);
			setEmail(data.email);
			setSocial(sc);
		} else {
			setName('사용자');
		}
	};

	useEffect(() => {
		console.log('log', name, signIn);
		async function loadLibrary() {
			try {
				const result = await axios.get('/userInfo', {
					params: { email, social },
				});
				const re = result.data;
				setUid(re);
			} catch (e) {
				console.log(e);
			}
		}
		if (signIn === true) {
			loadLibrary();
		}
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
			<Route exact path="/mylib" component={() => <MyLibrary uid={uid} />} />
			<Route exact path="/book_info/:id" component={() => <BookInfo uid={uid} />} />
			<Route path="/calendar" component={BookCalendar} />
			<Route path="/search" component={Search} />
		</Grid>
	);
}

export default App;
