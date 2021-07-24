import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Paper } from '@material-ui/core';

const BookList = ({ itemData, path }) => {
	return (
		<Grid container spacing={2} className="booklist" align="center">
			{itemData.map((item) => (
				<Grid item xs={4} className="bookCard">
					<Link
						to={{
							pathname: `${path}${item.id}`,
							state: item,
						}}
					>
						<Button>
							<Paper className="bookcard-paper">
								<img className="image" src={item.img} alt="title" />
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
