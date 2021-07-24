import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const SearchBar = ({ title }) => {
	return (
		<Grid container className="search-container">
			<Paper
				component="form"
				className="home-search"
				style={{
					borderRadius: 20,
					backgroundColor: '#fdd45a',
				}}
				variant="contained"
			>
				<Grid className="search-input">
					<InputBase placeholder="원하는 책을 검색해보세요!" inputProps={{ 'aria-label': 'search' }} />
				</Grid>
				<Grid className="search-icon">
					<Link
						to={{
							pathname: `search/${title}`,
							state: title,
						}}
					>
						<IconButton aria-label="search">
							<SearchIcon />
						</IconButton>
					</Link>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default SearchBar;
