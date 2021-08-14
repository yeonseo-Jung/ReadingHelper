import React from 'react';
import { Button, Dialog, Grid } from '@material-ui/core';
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

/*
    title, info: 경고창 제목과 내용
    path: 확인 클릭 후 이동할 경로
    handleLogout: 로그아웃시 로그아웃 처리 후 홈으로 이동 
*/
const NoticeDialog = ({ title, info, path, handleLogout }) => {
	return (
		<div>
			<Grid>
				<Dialog open className="noticedialog">
					<DialogTitle className="title">{title}</DialogTitle>
					<DialogContent className="content">
						<DialogContentText>{info}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary">취소</Button>
						<Link to={path}>
							<Button variant="contained" color="secondary" onClick={handleLogout}>
								확인
							</Button>
						</Link>
					</DialogActions>
				</Dialog>
			</Grid>
		</div>
	);
};
export default NoticeDialog;
