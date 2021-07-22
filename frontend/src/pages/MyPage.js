import React from 'react';
import { Grid, Typography, Paper, Button, Avatar, Link } from '@material-ui/core';
import GoodStamp from '../components/styles/good_stamp.png';
import ThumbStamp from '../components/styles/thumb_stamp.PNG';
import BookList from '../components/styles/book_list.jpg';
import UserEdit from './UserEdit';

function MyPage() {
	const move = () => {
		window.location.href = '/mypage/edit';
	};
	return (
		<Grid container className="mypage" maxWidth="xs">
			{window.location.pathname === '/mypage/edit' ? (
				<UserEdit />
			) : (
				<Grid container>
					<Grid container direction="column" className="mypage-left">
						<Paper elevation={2} className="book-title">
							캐릭터가 자랄 수 있게 책을 읽어봐요
						</Paper>
						<Grid className="book-paper">
							<img src={BookList} width="300" height="400" alt="booklist" />
						</Grid>
					</Grid>

					<Grid container className="mypage-right">
						<Typography variant="h5" className="profile-title">
							내 정보 관리
						</Typography>
						<Grid container className="profile-container">
							<Button>
								<Paper
									style={{
										borderRadius: 20,
										backgroundColor: '#fdd45a',
									}}
									elevation={3}
									className="profile-paper"
								>
									<Avatar className="profile" />
									<Grid container direction="column" align="start" className="profile-name">
										<Typography
											variant="h7"
											style={{
												color: '#ffffff',
											}}
										>
											Lv.1 독서 새싹
										</Typography>
										<Typography variant="h7" className="name">
											사용자님
										</Typography>
									</Grid>
									<Link to="/mypage/edit">
										<Button
											style={{
												borderRadius: 15,
												backgroundColor: '#ffffff',
											}}
											className="profile-btn"
											onClick={move}
										>
											수정
										</Button>
									</Link>
								</Paper>
							</Button>
						</Grid>
						<Typography variant="h5" className="profile-title">
							보유 뱃지
						</Typography>
						<Grid container className="profile-container">
							<Button>
								<Paper
									style={{
										borderRadius: 20,
										backgroundColor: '#fdd45a',
									}}
									elevation={3}
									className="profile-paper"
								>
									<Grid container direction="column" align="center">
										<Grid align="center">
											<Avatar src={GoodStamp} className="badge" />
										</Grid>
										<Typography variant="h7" className="badge-name">
											참 잘했어요!
										</Typography>
									</Grid>
									<Grid container direction="column" align="center">
										<Grid align="center">
											<Avatar src={ThumbStamp} className="badge" />
										</Grid>
										<Typography variant="h7" className="badge-name">
											베스트셀러 수집가
										</Typography>
									</Grid>
								</Paper>
							</Button>
						</Grid>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
}
export default MyPage;
