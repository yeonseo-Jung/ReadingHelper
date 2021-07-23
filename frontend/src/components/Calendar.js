import { Grid } from '@material-ui/core';
import moment from 'moment';
import React, { Component } from 'react';

function Week({ firstDayOfThisWeekformat, ymOfThisCalendar }) {
	const Days = (firstDayFormat) => {
		const days = [];
		for (let i = 0; i < 7; i += 1) {
			const Day = moment(firstDayFormat).add('d', i);
			days.push({
				yearMonthDayFormat: Day.format('YYYY-MM-DD'),
				getDay: Day.format('D'),
				isHolyDay: false,
			});
		}
		return days;
	};
	const mapDaysToComponents = (d, calendarMonthYear) => {
		const thisMonth = moment(calendarMonthYear);
		return d.map((dayInfo, i) => {
			let className = 'date-weekday-label';

			if (!thisMonth.isSame(dayInfo.yearMonthDayFormat, 'month')) {
				className = 'date-notThisMonth';
			} else if (i === 0) {
				className = 'date-sun';
			} else if (i === 6) {
				className = 'date-sat';
			}

			return (
				<div className={`calendar-day ${className}`}>
					<div className="calendar-day-label">{dayInfo.getDay}</div>
				</div>
			);
		});
	};
	return <div className="calendar-week">{mapDaysToComponents(Days(firstDayOfThisWeekformat), ymOfThisCalendar)}</div>;
}
function Calendar({ calendarYM }) {
	const Weeks = (monthYear) => {
		const firstDayOfMonth = moment(monthYear).startOf('month');
		const firstDateOfMonth = firstDayOfMonth.get('d');

		const firstDayOfWeek = firstDayOfMonth.clone().add('d', -firstDateOfMonth);
		// const lastDayOfThisCalendar = dayOfThisCalendar.clone().add('d', 6 * 7);

		const weeks = [];

		for (let i = 0; i < 6; i += 1) {
			weeks.push(
				<Week
					key={`calendar-week-${i}`}
					ymOfThisCalendar={firstDayOfMonth.format('YYYY-MM')}
					firstDayOfThisWeekformat={firstDayOfWeek
						.clone()
						.add('d', i * 7)
						.format('YYYY-MM-DD')}
				/>,
			);
		}
		return weeks;
	};
	return (
		<div className="calendar-container">
			<div className="calendar-date-header">
				<Grid className="calendar-date-component date-sun">일</Grid>
				<Grid className="calendar-date-component date-weekday">월</Grid>
				<Grid className="calendar-date-component date-weekday">화</Grid>
				<Grid className="calendar-date-component date-weekday">수</Grid>
				<Grid className="calendar-date-component date-weekday">목</Grid>
				<Grid className="calendar-date-component date-weekday">금</Grid>
				<Grid className="calendar-date-component date-sat">토</Grid>
			</div>
			{Weeks(calendarYM)}
		</div>
	);
}
export default Calendar;
