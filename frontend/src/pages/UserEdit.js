import React from 'react';
import { Grid, Typography, TextField, Paper, Button, Avatar, Link } from '@material-ui/core';

function UserEdit() {
	return (
		<Grid container className="useredit">
			<Typography component="h1" variant="h5" className="edit-title">
				회원정보 수정
			</Typography>
			<Grid container className="form" noValidate>
				<Grid className="profile-name" container spacing={2}>
					<Grid className="profile" item xs={2}>
						<Avatar className="avatar" />
					</Grid>
					<Grid className="name" item xs={8}>
						<TextField
							variant="outlined"
							color="secondary"
							autoComplete="fname"
							name="firstName"
							fullWidth
							id="firstName"
							label="닉네임"
							autoFocus
							defaultValue="이름"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
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
							fullWidth
							id="email"
							label="아이디"
							name="email"
							defaultValue="user@gmail.com"
							autoComplete="email"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							name="password"
							label="비밀번호"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name="checkPassword"
							label="비밀번호 확인"
							type="password"
							id="checkPassword"
							autoComplete="current-password"
						/>
					</Grid>
				</Grid>
			</Grid>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				className="submit"
				style={{
					borderRadius: 20,
				}}
			>
				수정
			</Button>
		</Grid>
	);
}
export default UserEdit;
