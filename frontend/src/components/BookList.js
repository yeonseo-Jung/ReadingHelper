import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Paper } from '@material-ui/core';

const BookList = ({ itemData, path }) => {
	const data = [itemData];
	console.log(data[0]);
	if (itemData === undefined) {
		return <Grid>검색 결과 없음</Grid>;
	}
	return (
		<Grid container spacing={2} className="booklist" align="center">
			{data[0].map((item) => (
				<Grid item xs={4} className="bookCard">
					<Link
						to={{
							pathname: `${path}${item.id}`,
							state: item,
						}}
					>
						<Button>
							<Paper className="bookcard-paper">
								<img className="image" src={item.thumbnail} alt="title" />
								<Grid container className="binfo-typo">
									<Grid>{item.title}</Grid>
									<Grid>{item.author}</Grid>
								</Grid>
							</Paper>
						</Button>
					</Link>
				</Grid>
			))}
		</Grid>
	);
};

export default BookList;
