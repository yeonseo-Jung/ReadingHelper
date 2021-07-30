import React from 'react';
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { RoundButton } from '../components';

function ReportWrite() {
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
				<Button startIcon={<PhotoCameraIcon />} />
			</Grid>
			<Grid align="center" direction="column" className="info-des">
				<Grid container className="info">
					<Button style={styles.title}>제목</Button>
					<TextField className="info-text" defaultValue={title} />
				</Grid>
				<Grid container className="info">
					<Button style={styles.title}>내용</Button>
					<TextField defaultValue="꿈을 사는 이야기" />
				</Grid>
				<Grid container className="info-box">
					<Paper elevation={2} className="info-box-paper">
						<TextField variant="outlined" fullWidth defaultValue="느낀점" multiline max rows={14} />
					</Paper>
					<Grid container className="info-edit">
						<Link
							to={{
								pathname: `/report/${location.state.id}`,
								state: location.state,
							}}
						>
							<RoundButton text="확인" />
						</Link>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
export default ReportWrite;
