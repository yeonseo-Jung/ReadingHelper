import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

function Join({ getLoginInfo }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [pwcheck, setPwcheck] = useState('');
	const history = useHistory();

	const handleSubmit = () => {
		if (!name) {
			alert('이름을 입력해주세요.');
			return;
		}
		if (!email || !password) {
			alert('아이디 또는 비밀번호를 입력해주세요.');
			return;
		}
		if (password !== pwcheck) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}
		// eslint-disable-next-line no-useless-escape
		const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		// 형식에 맞는 경우 true 리턴
		if (!regExp.test(email)) {
			alert('이메일 형식이 맞지 않습니다.');
			return;
		}
		const data = {
			type: 'signup',
			name,
			email,
			password,
		};
		getLoginInfo(data);
		history.push('/login/callback/own/sign');
	};

	return (
		<Container component="main" maxWidth="xs">
			<Grid className="join">
				<CssBaseline />
				<Avatar className="avatar">
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					회원가입
				</Typography>
				<form className="form" noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="닉네임"
								autoFocus
								onChange={(e) => setName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="date"
								label="Birthday"
								type="date"
								defaultValue="2021-07-19"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="이메일"
								name="email"
								autoComplete="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="비밀번호"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="checkPassword"
								label="비밀번호 확인"
								type="password"
								id="checkPassword"
								autoComplete="current-password"
								onChange={(e) => setPwcheck(e.target.value)}
							/>
							{password !== pwcheck ? (
								<Grid className="pwcheck">비밀번호가 일치하지 않습니다.</Grid>
							) : null}
						</Grid>
					</Grid>
					<Button fullWidth variant="contained" color="secondary" className="submit" onClick={handleSubmit}>
						가입하기
					</Button>
				</form>
			</Grid>
		</Container>
	);
}
export default Join;
