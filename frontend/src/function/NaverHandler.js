import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadSpinner } from '../components';
import { NAVER_KEY, REDIRECT_URI } from '.';

const { naver } = window;

// id가 naverIdLogin인 곳에서 작동한다.
const NaverHandler = () => {
	const history = useHistory();
	const naverLogin = new naver.LoginWithNaverId({
		clientId: NAVER_KEY,
		callbackUrl: `${REDIRECT_URI}/naver`,
		isPopup: false,
		callbackHandle: false,
	});
	naverLogin.init();

	useEffect(() => {
		const url = new URL(window.location.href);
		if (!url.hash) return;
		const token = url.hash.split('=')[1].split('&')[0];
		console.log('log', token);

		naverLogin.getLoginStatus(async function (status) {
			// 로그인 성공
			if (status) {
				// const userinfo = naverLogin.user;
				alert('네이버 로그인에 성공했습니다.');
				setTimeout(() => {
					history.push('/');
				}, 1200);
			}
		});
	}, []);

	return <LoadSpinner />;
};

export default NaverHandler;
