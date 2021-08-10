import React, { useEffect } from 'react';
import axios from 'axios';
import { history } from 'react-dom';
import { LoadSpinner } from '../components';

function requestToken(code) {
	const JS_APP_KEY = '8c11f2500a76e9aeaf3d42141179f84c';
	const REDIRECT_URI = 'http://localhost:8080/login/callback/kakao';
	const makeFormData = (params) => {
		const searchParams = new URLSearchParams();
		Object.keys(params).forEach((key) => {
			searchParams.append(key, params[key]);
		});

		return searchParams;
	};

	return axios({
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		},
		url: 'https://kauth.kakao.com/oauth/token',
		data: makeFormData({
			grant_type: 'authorization_code',
			client_id: JS_APP_KEY,
			redirect_uri: REDIRECT_URI,
			code,
		}),
	});
}

const OAuthHandler = (props) => {
	const url = new URL(window.location.href);
	const authorizationCode = url.searchParams.get('code');
	if (authorizationCode) {
		requestToken(authorizationCode)
			.then(({ data }) => {
				console.log('requestToken:', data);
			})
			.catch((err) => {
				console.error('requestToken:', err);
			});
	}

	return <LoadSpinner />;
};

export default OAuthHandler;
