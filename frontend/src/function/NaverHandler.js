import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadSpinner } from '../components';
import RequestHandler from './RequestHandler';

function NaverHandler({ getUserInfo }) {
	const history = useHistory();
	const url = new URL(window.location.href);
	// 인가 코드
	const authorizationCode = url.searchParams.get('code');
	// 네이버는 사이트 간 요청 위조 공격을 방지하기 위해 상태 토큰값에 URL 인코딩을 적용한 state를 백엔드에 꼭 넘겨주어야 함
	const state = url.searchParams.get('state');
	useEffect(() => {
		if (authorizationCode) {
			// 백엔드와 통신하는 handler 함수
			RequestHandler({ path: 'naver', params: { code: authorizationCode, state } })
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
					alert(`☆${res.data.name}★님 환영합니다!!!!!!!!`);
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
}

export default NaverHandler;
