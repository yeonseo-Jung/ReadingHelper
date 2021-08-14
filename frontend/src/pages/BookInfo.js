import React from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import useReactRouter from 'use-react-router';

function BookInfo(props) {
	const { location } = useReactRouter();
	const imgurl = location.state.thumbnail;
	const { title } = location.state;

	return (
		<Grid container className="bookInfo" align="center">
			<Grid>
				<img src={imgurl} alt="bookCover" className="bookCover" />
			</Grid>
			<Grid container direction="column" className="binfo-des">
				<Grid container className="info">
					<Button>제목</Button>
					<Grid className="info-text">{title}</Grid>
				</Grid>
				<Grid container className="info">
					<Button>내용</Button>
					<Grid className="info-text"> 내..용..</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
export default BookInfo;
