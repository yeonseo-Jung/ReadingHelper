/* eslint-disable react/jsx-indent */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadSpinner } from '../components';
import RequestHandler from './RequestHandler';

const KakaoHandler = ({ getUserInfo }) => {
	const history = useHistory();
	const url = new URL(window.location.href);
	const authorizationCode = url.searchParams.get('code');
	// 인가 코드 받은 후
	useEffect(() => {
		if (authorizationCode) {
			// 백엔드와 통신하는 handler 함수
			RequestHandler({ path: 'kakao', params: { code: authorizationCode } })
				.then((res) => {
					console.log('requestToken:', res.data);
					/*
						res.data =
						{
							access_token: "",
							name: "",
							email: "" 
						}
					*/
					alert(`☆${res.data.nickname}★님 환영합니다!!!!!!!!`);
					getUserInfo(res.data);
					setTimeout(() => {
						history.push('/');
					}, 500);
				})
				.catch((err) => {
					console.error('requestToken error:', err);
				});
		}
	}, []);

	return <LoadSpinner />;
};

export default KakaoHandler;
