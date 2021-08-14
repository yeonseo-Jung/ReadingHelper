/* eslint-disable react/jsx-indent */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { LoadSpinner } from '../components';
import { CLIENT_ID, REDIRECT_URI } from './OAuth';

function requestToken(code) {
	const makeFormData = (params) => {
		const searchParams = new URLSearchParams();
		Object.keys(params).forEach((key) => {
			searchParams.append(key, params[key]);
		});

		return searchParams;
	};
	// js key와 redirect uri를 통해 백엔드에 토큰 요청
	return axios({
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		},
		url: 'https://kauth.kakao.com/oauth/token',
		data: makeFormData({
			grant_type: 'authorization_code',
			client_id: CLIENT_ID,
			redirect_uri: REDIRECT_URI,
			code,
		}),
	});
}

const OAuthHandler = (props) => {
	const history = useHistory();
	const url = new URL(window.location.href);
	const authorizationCode = url.searchParams.get('code');
	// 인가 코드 받은 후
	if (authorizationCode) {
		// 백엔드에 토큰 요청
		requestToken(authorizationCode)
			.then(({ data }) => {
				console.log('requestToken:', data);
				history.push('/');
				alert('로그인에 성공했습니다.');
			})
			.catch((err) => {
				console.error('requestToken error:', err);
			});
	}

	return <LoadSpinner />;
};

export default OAuthHandler;
