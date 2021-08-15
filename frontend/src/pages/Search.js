import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BookList from '../components/BookList';
import SubHeader from '../components/SubHeader';
import SearchBar from '../components/SearchBar';

function Search() {
	const [itemData, setItemData] = useState();
	const [title, setTitle] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const loc = useLocation();
	console.log(loc.search);
	useEffect(() => {
		if (loc.search !== '') {
			// const st = loc.state;
			console.log(`loc : ${loc}`);

			console.log(`url 정보 : ${loc.search}`);

			const keyw = loc.search.split('=');
			setTitle(keyw[1]);
			console.log(`전달받은 제목 : ${keyw[1]}`);
			const re = loc.state;
			console.log('result 값');
			console.log(re.result);
			setItemData(re.result);
		}
	}, [loc.search]);

	useEffect(() => {
		async function updatePage() {
			try {
				console.log(`현재 페이지 번호 : ${currentPage}`);
				const result = await axios.get('/search', {
					params: { query: title, pageNum: currentPage },
				});
				const re = result.data;
				console.log(`${currentPage}페이지 내용 : ${re.documents}`);
				setItemData(re.documents);
			} catch (e) {
				console.log(e);
			}
		}
		updatePage();
	}, [currentPage]);

	const movePage = async (num) => {
		if (!(currentPage === 1 && num === -1)) {
			setCurrentPage(currentPage + num);
		}
	};

	return (
		<Grid align="center" className="mylibrary">
			<Grid align="center" className="mylibrary-container">
				<SearchBar />
				<SubHeader name="검색 결과" />
				{(() => {
					if (itemData === undefined) {
						return <Grid>검색 결과 없음</Grid>;
					}

					return (
						<Grid>
							<BookList itemData={itemData} path="/book_info/" />
							<Button
								onClick={() => {
									movePage(-1);
								}}
							>
								<ArrowLeftIcon />
							</Button>
							<Button>{currentPage}</Button>
							<Button
								onClick={() => {
									movePage(1);
								}}
							>
								<ArrowRightIcon />
							</Button>
						</Grid>
					);
				})()}
			</Grid>
		</Grid>
	);
}
export default Search;
