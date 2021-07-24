import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SubHeader from '../components/SubHeader';
import BookList from '../components/BookList';

const itemData = [
	{
		id: 1,
		img: 'http://image.kyobobook.co.kr/images/book/xlarge/556/x9791191056556.jpg',
		title: '미드나잇 라이브러리',
		author: '매트 헤이그',
	},
	{
		id: 2,
		img: 'http://image.kyobobook.co.kr/images/book/xlarge/267/x9788936434267.jpg',
		title: '아몬드',
		author: '손원평',
	},
	{
		id: 3,
		img: 'https://www.readersnews.com/news/photo/202009/100406_67647_654.jpg',
		title: '달러구트 꿈 백화점',
		author: '이미예',
	},
	{
		id: 4,
		img: 'http://image.kyobobook.co.kr/images/book/xlarge/018/x9791190090018.jpg',
		title: '우리가 빛의 속도로 갈 수 없다면',
		author: '김연수',
	},
	{
		id: 5,
		img: 'https://img.hankyung.com/photo/201603/BA.11350864.1.jpg',
		title: '주토피아',
		author: '@joody',
	},
	{
		id: 6,
		img: 'https://www.puzzlesarang.com/shop/data/goods/1563264794714m0.jpg',
		title: '신데렐라',
		author: 'cinderella',
	},
];
function Report() {
	return (
		<Grid align="center" className="report">
			<Grid align="center" className="report-container">
				<SubHeader name="독후감" />
				<BookList itemData={itemData} path="/report/" />
				<Link
					to={{
						pathname: '/report/edit',
					}}
				>
					<Button
						style={{
							borderRadius: 20,
							backgroundColor: '#fdd45a',
							color: '#ffffff',
						}}
						variant="contained"
					>
						작성
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
}
export default Report;
