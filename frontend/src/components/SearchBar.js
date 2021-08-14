import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Grid, Paper, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const SearchBar = (props) => {
	const [keyword, setKeyword] = useState('');
	const [title, setTitle] = useState('');
	const [itemData, setItemData] = useState();
	const { disabled } = props;
	const history = useHistory();

	const onChange = (event) => {
		console.log(event.target.value);
		setTitle(event.target.value);
	};
	/*
	useEffect(() => {
		console.log(`아이템 결고 ㅏ : ${itemData}`);
		history.push({
			pathname: '/search',
			search: `?keyword=${title}`,
			state: { result: itemData },
		});
	}, [itemData]);
	*/

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

				// const obj = JSON.parse(r);
				console.log(`1 페이지 내용 `);
				console.log(r);
				setItemData(re.documents);

				// console.log(`data: ${obj.title}`);
				console.log(`아이템 :${itemData}`);
				history.push({
					pathname: '/search',
					search: `?keyword=${tit}`,
					state: { result: r },
				});
			}
		} catch (e) {
			console.log(e);
		}

		// console.log(`keyword : ${title}`);
		console.log('검색 버튼 클릭');
		// history.push(`/search?keyword=${tit}`);
		// return <Redirect to="/search" />;
	};

	const keyPress = (event) => {
		console.log(event.key);
		if (event.key === 'Enter') {
			event.preventDefault();
			onClick(title);
			console.log('엔터키!');
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
