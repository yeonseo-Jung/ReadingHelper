import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { NAVER_KEY, REDIRECT_URI } from '../function';

const { naver } = window;
function NaverButton(props) {
	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_KEY,
			callbackUrl: `${REDIRECT_URI}/naver`,
			isPopup: false,
			loginButton: { color: 'green', type: 1, height: '30' },
		});
		naverLogin.init();
	};
	useEffect(() => {
		initializeNaverLogin();
	}, []);

	return <Grid id="naverIdLogin" />;
}

export default NaverButton;
