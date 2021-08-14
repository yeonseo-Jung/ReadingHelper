import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Grid, Paper, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const SearchBar = (props) => {
	const [title, setTitle] = useState('');
	const [itemData, setItemData] = useState();
	const { disabled } = props;
	const history = useHistory();

	const onChange = (event) => {
		console.log(event.target.value);
		setTitle(event.target.value);
	};

	const onClick = async (tit) => {
		console.log(`제목 ;${tit}`);

		try {
			console.log(`title: ${tit}`);
			console.log(tit);
			if (tit === '') {
				history.push('/search');
			} else {
				const result = await axios.get('/search', {
					params: { query: tit, pageNum: 1 },
				});
				const re = result.data;
				const r = re.documents;

				console.log(r);
				setItemData(re.documents);
				history.push({
					pathname: '/search',
					search: `?keyword=${tit}`,
					state: { result: r },
				});
			}
		} catch (e) {
			console.log(e);
		}
		console.log('검색 버튼 클릭');
	};

	const keyPress = (event) => {
		console.log(event.key);
		if (event.key === 'Enter') {
			event.preventDefault();
			onClick(title);
		}
		return '';
	};

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
					<InputBase
						placeholder="원하는 책을 검색해보세요!"
						inputProps={{ 'aria-label': 'search' }}
						disabled={disabled}
						onChange={onChange}
						onKeyPress={keyPress}
						onSubmit="return false;"
					/>
				</Grid>
				<Grid className="search-icon">
					<IconButton aria-label="search" onClick={() => onClick(title)}>
						<SearchIcon />
					</IconButton>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default SearchBar;
