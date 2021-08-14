import React from 'react';
import { Avatar, Button, Grid, Paper, Typography, InputBase } from '@material-ui/core';
import SearchBar from '../components/SearchBar';
import ChatChar from '../components/styles/chat_character.jpeg';
import UserChar from '../components/styles/user_character.png';
import InitCalendar from '../components/styles/calendar.PNG';

function Home() {
	const title = '달러구트 꿈 백화점';
	return (
		<Grid container className="home">
			<SearchBar />
			<Grid container direction="column" className="calendar-container">
				<Paper elevation={3} className="home-calendar">
					<img src={InitCalendar} alt="cal" />
				</Paper>
				<Grid className="calendar-info">나만의 독서 달력을 만들어 보세요!</Grid>
			</Grid>
			<Paper elevation={3} className="chatSection">
				<Typography component="h1" variant="h5" className="simple_msg">
					독서 비서와 대화한 내용이 독후감으로!
				</Typography>
				<Grid className="chat">
					<Grid className="message_left">
						<Avatar className="avatar" src={ChatChar} />
						<Button className="bubble">친구가 선택한 책은 아기 돼지 삼형제야.</Button>
					</Grid>
					<Grid className="message_left_single">
						<Button className="bubble">어떤 내용의 책이야?</Button>
					</Grid>
					<Grid className="message_right">
						<Button className="bubble">아기 돼지 세마리가 집을 짓는 이야기</Button>
						<Avatar className="avatar" src={UserChar} />
					</Grid>
					<Grid className="message_left">
						<Avatar className="avatar" src={ChatChar} />
						<Button className="bubble">가장 기억에 남는 부분은 어디야?</Button>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default Home;
