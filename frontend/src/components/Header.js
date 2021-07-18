import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';

const Header = () => {
	return (
		<Grid className="header">
			<Link to="/">
				<Button className="header-icon">독서 비서</Button>
			</Link>
			<Grid className="header-buttons">
				<Grid>사용자님, 환영합니다!</Grid>
				<Link to="/login">
					<Button>로그인</Button>
				</Link>
				<Link to="join">
					<Button>회원가입</Button>
				</Link>
			</Grid>
		</Grid>
	);
};

export default Header;
