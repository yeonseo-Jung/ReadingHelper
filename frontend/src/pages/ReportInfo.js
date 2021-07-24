import React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import { RoundButton } from '../components';

function ReportInfo() {
	const { location } = useReactRouter();
	const imgurl = location.state.img;
	const { title } = location.state;
	const styles = {
		title: {
			width: 80,
			height: 45,
			fontSize: 18,
			fontWeight: 'bold',
			borderRadius: 20,
		},
	};
	return (
		<Grid container className="reportinfo">
			<Grid container className="info-grid">
				<Paper className="info-paper">
					<img className="image" src={imgurl} alt="title" />
				</Paper>
			</Grid>
			<Grid align="center" direction="column" className="info-des">
				<Grid container className="info">
					<Button style={styles.title}>제목</Button>
					<Grid className="info-text">{title}</Grid>
				</Grid>
				<Grid container className="info">
					<Button style={styles.title}>내용</Button>
					<Grid className="info-text">꿈을 사는 이야기</Grid>
				</Grid>
				<Grid container className="info-box">
					<Paper elevation={2} className="info-box-paper">
						느낀점:
					</Paper>
					<Grid container className="info-edit">
						<Link
							to={{
								pathname: `${location.state.id}/edit`,
								state: location.state,
							}}
						>
							<RoundButton text="수정" />
						</Link>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
export default ReportInfo;
