import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import { CalendarHeader, Calendar } from '../components';

function BookCalendar() {
	const [YM, setYM] = useState(moment());

	const moveMonth = (month) => {
		setYM(moment(YM).add(month, 'M'));
		console.log(moment(YM).format('YYYY년 MM월'));
	};

	return (
		<div className="bookcalendar">
			<Grid className="calendar-layout" align="center">
				<div className="book-calendar-container">
					<CalendarHeader calendarYM={moment(YM).format('YYYY년 MM월')} moveMonth={moveMonth} />
					<Calendar calendarYM={moment(YM).format('YYYY-MM-DD')} />
				</div>
			</Grid>
		</div>
	);
}
export default BookCalendar;
