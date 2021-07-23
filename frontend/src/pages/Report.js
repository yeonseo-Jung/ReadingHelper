import React from 'react';
import { Route } from 'react-router-dom';
import { Grid, Paper, Link, Button } from '@material-ui/core';
import ReportInfo from './ReportInfo';
import dream from '../components/styles/dream.jpg';
import amond from '../components/styles/amond.jpg';
import midnight from '../components/styles/midnight.jpg';

function FormRow() {
	const move = () => {
		window.location.href = '/report/info';
	};
	return (
		<>
			<Grid item xs={4}>
				<Button onClick={move}>
					<Paper className="report-paper">
						<img className="image" src={midnight} alt="title" />
					</Paper>
				</Button>
				<Grid className="report-name">미드나잇 라이브러리</Grid>
			</Grid>
			<Grid item xs={4}>
				<Button onClick={move}>
					<Paper className="report-paper">
						<img className="image" src={amond} alt="title" />
					</Paper>
				</Button>
				<Grid className="report-name">아몬드</Grid>
			</Grid>
			<Grid item xs={4}>
				<Button onClick={move}>
					<Paper className="report-paper">
						<img className="image" src={dream} alt="title" />
					</Paper>
				</Button>
				<Grid className="report-name">달러구트 꿈 백화점</Grid>
			</Grid>
		</>
	);
}
function Report() {
	return (
		<Grid container align="center" className="report">
			<Grid container align="center" className="report-container">
				<Grid container className="report-typo">
					독후감 갤러리
				</Grid>
				<Grid className="report-line" />
				{window.location.pathname === '/report/info' ? (
					<ReportInfo />
				) : (
					<Grid container className="report-grid" spacing={4}>
						<Grid container item xs={14} spacing={4}>
							<FormRow />
						</Grid>
						<Grid container item xs={14} spacing={4}>
							<FormRow />
						</Grid>
						<Grid container item xs={14} spacing={4}>
							<FormRow />
						</Grid>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}
export default Report;
