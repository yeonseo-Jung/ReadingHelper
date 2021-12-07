import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadSpinner } from '../components';
import RequestHandler from './RequestHandler';

const JoinHandler = ({ userInfo, getUserInfo }) => {
	const history = useHistory();
	let url = '';
	if (userInfo.type === 'signup') {
		url = 'own/sign';
	} else {
		url = 'own';
	}
	// 인가 코드 받은 후
	useEffect(() => {
		// 백엔드와 통신하는 handler 함수
		RequestHandler({ path: url, params: userInfo })
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
				if (res.data.response === 'invalidate') {
					alert('아이디 또는 비밀번호가 올바르지 않습니다.');
					history.goBack();
				} else if (res.data.response === 'duplicated') {
					alert('이미 가입된 계정입니다. 다른 이메일을 사용하세요.');
					history.goBack();
				} else {
					alert(`☆${res.data.name}★님 환영합니다!!!!!!!!`);
					getUserInfo(res.data);
					setTimeout(() => {
						history.push('/');
					}, 500);
				}
			})
			.catch((err) => {
				console.error('requestToken error:', err);
			});
	}, []);

	return <LoadSpinner />;
};

export default JoinHandler;