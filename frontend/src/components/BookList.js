import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Paper } from '@material-ui/core';

const BookList = ({ from, itemData, path }) => {
	const data = itemData;
	console.log(data);
	if (itemData === undefined) {
		return <Grid>검색 결과 없음</Grid>;
	}
	return (
		<Grid container spacing={2} className="booklist" align="center">
			{data.map((item) => (
				<Grid item xs={4} className="bookCard">
					<Link
						to={{
							pathname: `${path}${item.id}`,
							state: { itemData: item, from },
						}}
					>
						<Button>
							<Paper className="bookcard-paper">
								<img className="image" src={item.thumbnail} alt="title" />
								<Grid container className="binfo-typo">
									<Grid>{item.title}</Grid>
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
