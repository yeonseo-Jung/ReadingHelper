import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper } from '@material-ui/core';
import useReactRouter from 'use-react-router';
import axios from 'axios';

const BookInfo = () => {
	const { location } = useReactRouter();
	const { from } = location.state;
	const { itemData } = location.state;
	const { isbn } = itemData;
	const { thumbnail } = itemData;
	const { title } = itemData;
	const { contents } = itemData;
	const [author, setAuthor] = useState('');
	const [translator, setTranslator] = useState('');
	const [isTranslator, setIsTrans] = useState(0);
	const { publisher } = itemData;

	useEffect(() => {}, [isTranslator]);
	useEffect(() => {
		// 검색창에서 넘어온 경우
		if (from === 0) {
			const { authors } = itemData.authors;
			const { translators } = itemData.translators;

			if (authors !== undefined) {
				if (authors.length > 1) {
					let result = '';
					const sizeA = authors.length;
					for (let a = 0; a < sizeA; a += 1) {
						result += authors[a];
						if (a !== sizeA - 1) {
							result += ',';
						}
					}
					setAuthor(result);
				} else {
					setAuthor(authors[0]);
				}
			}
			if (translators !== undefined) {
				setIsTrans(1);
				const tlength = translators.length;
				if (tlength > 1) {
					let result = '';
					for (let t = 0; t < tlength; t += 1) {
						result += translators[t];
						if (t !== tlength - 1) {
							result += ',';
						}
					}
					setTranslator(result);
				} else if (tlength === 1) {
					setTranslator(translators[0]);
				} else {
					setIsTrans(0);
					setTranslator('');
				}
			} else {
				setIsTrans(0);
				setTranslator('');
			}
		}
		// 내 서재에서 넘어온 경우
		else if (from === 1) {
			const at = itemData.author;
			const tr = itemData.translator;
			setAuthor(at);
			if (tr !== '') {
				setIsTrans(1);
				setTranslator(tr);
			} else {
				setIsTrans(0);
			}
		}
	}, []);

	const onClick = async () => {
		alert('내 서재에 책이 추가되었습니다!');
		console.log('내서재 담기 버튼 클릭');
		const bookInfo = {
			title,
			author,
			translator,
			publisher,
			contents,
			thumbnail,
			isbn,
			userId: 1,
		};
		console.log('책 정보');
		console.log(bookInfo);

		try {
			const result = await axios.post('/book_info', {
				params: bookInfo,
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Grid container className="bookInfo" align="center">
			<Grid container className="title-container">
				<Grid className="booktitle">{title}</Grid>
				<Grid className="booktitle-line" style={{ width: `${title.length * 18}px` }} />
			</Grid>
			<Grid className="book-content">
				<Grid>
					<img src={thumbnail} alt="bookCover" className="bookCover" />
				</Grid>

				<Grid container direction="column" className="binfo-des">
					<Grid container className="info">
						<Grid className="content-title">저자</Grid>
						<Grid className="info-container">
							<Grid className="info-tag">저자</Grid>
							<Grid className="info-text"> {author}</Grid>
							{isTranslator === 1 && (
								<Grid className="info-container">
									<Grid className="info-tag">역자</Grid>
									<Grid className="info-text"> {translator}</Grid>
								</Grid>
							)}
							<Grid className="info-tag">출판사</Grid>
							<Grid className="info-text"> {publisher}</Grid>
						</Grid>
					</Grid>

					<Grid container className="info">
						<Grid className="content-title">책 내용</Grid>
						<Grid className="info-text"> {contents}</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid container className="bottom-container">
				<Button className="btn-library" onClick={onClick}>
					내 서재 담기
				</Button>
			</Grid>
		</Grid>
	);
};
export default BookInfo;
