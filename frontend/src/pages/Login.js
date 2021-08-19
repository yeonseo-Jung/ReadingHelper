import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'; // 액시오스
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LoginImg from '../components/styles/login_character.jpeg';
import KaKaoIcon from '../components/styles/kakao_icon.png';
import NaverIcon from '../components/styles/naver_icon.png';
import { KAKAO_AUTH_URL, RequestHandler } from '../function';

function Login({ getLoginInfo }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const handleSubmit = () => {
		if (!email || !password) {
			alert('아이디 또는 비밀번호를 입력해주세요.');
			return;
		}
		const data = {
			type: 'login',
			email,
			password,
		};
		getLoginInfo(data);
		history.push('/login/callback/own');
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className="login">
				<Typography component="h1" variant="h5">
					로그인
				</Typography>
				<img src={LoginImg} width="80" height="110" alt="title" />
				<Typography>독비에 오신걸 환영합니다!</Typography>
				<form className="form" noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="아이디"
						id="email"
						name="email"
						autoComplete="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="비밀번호"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Link className="forgotPW" href="#!">
						비밀번호를 잊으셨나요?
					</Link>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className="btnLogin"
						onClick={handleSubmit}
					>
						로그인
					</Button>
				</form>
				<Grid className="anotherAccount">
					<Grid className="login-line" />
					다른 계정으로 로그인하기
					<Grid className="login-line" />
				</Grid>
				<Grid className="accounts">
					<Button variant="contained" className="btnAccount" href={KAKAO_AUTH_URL}>
						<img src={KaKaoIcon} height="30" alt="kakao" className="accountIcon" />
						카카오톡
					</Button>
					<Button variant="contained" className="btnAccount" onClick={RequestHandler}>
						<img src={NaverIcon} height="30" alt="kakao" className="accountIcon" />
						네이버
					</Button>
				</Grid>
			</div>
		</Container>
	);
}
export default Login;
