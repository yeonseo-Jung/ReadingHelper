import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import TitleImg from './styles/title_icon.jpg';
import NoticeDialog from './NoticeDialog';

const Header = ({ userChanged, handleLogout }) => {
	const styles = {
		borderRadius: 20,
		backgroundColor: '#fdd45a',
		color: '#ffffff',
	};
	const [user, setUser] = useState('');
	const [signOut, setSignOut] = useState(false);
	const setDialog = () => {
		setSignOut(!signOut);
	};
	useEffect(() => {
		setUser(userChanged);
		console.log('유저');
		console.log(userChanged);
	}, [userChanged]);
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
				{!user ? (
					<Grid className="header-logout">
						<Link to="/login">
							<Button style={styles} variant="contained">
								로그인
							</Button>
						</Link>
						<Link to="/join">
							<Button style={styles} variant="contained">
								회원가입
							</Button>
						</Link>
					</Grid>
				) : (
					<Grid className="header-login">
						<Link to="/mypage">
							<Button className="mypage-button">
								<FaceIcon className="mypage-icon" />
							</Button>
						</Link>
						{user}님 환영합니다!
						<Button style={styles} variant="contained" onClick={setDialog}>
							{signOut && (
								<NoticeDialog
									title="확인"
									info="로그아웃 하시겠습니까?"
									path="/"
									handleLogout={handleLogout}
								/>
							)}
							로그아웃
						</Button>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

export default Header;
