import React from 'react';
import { Grid, Paper, Link, Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InitCalendar from '../components/styles/calendar.PNG';

function Home() {
	return (
		<Grid container className="home">
			<Grid container className="search-container">
				<Paper
					component="form"
					className="home-search"
					style={{
						borderRadius: 20,
						backgroundColor: '#fdd45a',
					}}
					variant="contained"
				>
					<Grid className="search-input">
						<InputBase
							placeholder="원하는 책을 검색해보세요!"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Grid>
					<Grid className="search-icon">
						<IconButton aria-label="search">
							<SearchIcon />
						</IconButton>
					</Grid>
				</Paper>
			</Grid>
			<Grid container direction="column" className="calendar-container">
				<Paper elevation={3} className="home-calendar">
					<img src={InitCalendar} alt="cal" />
				</Paper>
				<Grid className="calendar-info">
					나만의 독서 달력을 만들어 보세요!
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Home;
