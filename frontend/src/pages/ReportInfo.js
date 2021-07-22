import React from 'react';
import { Grid, Paper, Link, Button } from '@material-ui/core';
import dream from '../components/styles/dream.jpg';
import amond from '../components/styles/amond.jpg';
import midnight from '../components/styles/midnight.jpg';

function FormRow() {
	return (
		<>
			<Grid container className="info-grid" item xs={4}>
				<Paper className="info-paper">
					<img className="image" src={midnight} alt="title" />
				</Paper>
			</Grid>
		</>
	);
}
function ReportInfo() {
	const styles = {
		width: 80,
		height: 45,
		fontSize: 18,
		fontWeight: 'bold',
		borderRadius: 20,
	};
	return (
		<Grid container className="reportinfo">
			<Grid container className="info-grid">
				<FormRow />
			</Grid>
			<Grid container direction="column" className="info-des">
				<Grid container className="info">
					<Button style={styles}>제목</Button>
					<Grid className="info-text">달러구트 꿈 백화점</Grid>
				</Grid>
				<Grid container className="info">
					<Button style={styles}>내용</Button>
					<Grid className="info-text">꿈을 사는 이야기</Grid>
				</Grid>
				<Grid container className="info-box">
					<Paper elevation={2} className="info-box-paper">
						느낀점:
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
}
export default ReportInfo;
