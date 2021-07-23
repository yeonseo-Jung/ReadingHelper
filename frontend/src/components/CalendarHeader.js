import React, { Component } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

function CalendarHeader({ calendarYM, moveMonth }) {
	return (
		<div className="calendar-header-container">
			<Grid container className="cheader-buttons calendar-header-middle" align="center">
				<Grid className="month-buttons calendar-header-middle">
					<Button
						onClick={() => {
							moveMonth(-1);
						}}
					>
						<ArrowLeftIcon />
					</Button>
					<Typography className="cheader-calendarYM calendar-header-middle">{calendarYM}</Typography>
					<Button
						onClick={() => {
							moveMonth(1);
						}}
					>
						<ArrowRightIcon />
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}
export default CalendarHeader;
