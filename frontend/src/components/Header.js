import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import TitleImg from './styles/title_icon.jpg';

const Header = () => {
	return (
		<Grid container className="header">
			<Grid className="header-title">
				<Link to="/">
					<Button>
						<Grid className="header-img">
							<img src={TitleImg} width="50" height="50" alt="title" />
						</Grid>
						<Grid container direction="row" className="header-icon">
							<Grid className="title-y">독</Grid>
							<Grid className="title-g">서</Grid>
							<Grid className="title-y">비</Grid>
							<Grid className="title-g">서</Grid>
						</Grid>
					</Button>
				</Link>
			</Grid>
			<Grid className="header-menu" xs={6}>
				<Link to="/mylib">
					<Button>내 서재</Button>
				</Link>
				<Grid className="menu-line" />
				<Link to="/report">
					<Button>독후감</Button>
				</Link>
				<Grid className="menu-line" />
				<Link to="/calendar">
					<Button>독서 달력</Button>
				</Link>
			</Grid>
			<Grid className="header-buttons">
				<Link to="/login">
					<Button
						style={{
							borderRadius: 20,
							backgroundColor: '#fdd45a',
						}}
						variant="contained"
					>
						로그인
					</Button>
				</Link>
				<Link to="join">
					<Button
						style={{
							borderRadius: 20,
							backgroundColor: '#fdd45a',
						}}
						variant="contained"
					>
						회원가입
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
};

export default Header;
