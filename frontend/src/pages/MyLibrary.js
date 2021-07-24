import React from 'react';
import { Grid } from '@material-ui/core';
import BookList from '../components/BookList';
import SubHeader from '../components/SubHeader';

const itemData = [
	{
		id: 1,
		img: 'https://cdn.pixabay.com/photo/2018/01/10/23/53/rabbit-3075088_960_720.png',
		title: '토끼의 하루',
		author: 'dok2',
	},
	{
		id: 2,
		img: 'https://www.fashionn.com/files/board/2015/image/p19r7o9qe1av7a681aapaaj1com1.jpg',
		title: '인사이드 아웃',
		author: '기쁨이',
	},
	{
		id: 3,
		img: 'http://image.kyobobook.co.kr/images/book/xlarge/453/x9788967356453.jpg',
		title: '심슨 가족이 사는 법',
		author: '@Simpsons',
	},
	{
		id: 4,
		img: 'http://image.kyobobook.co.kr/images/book/xlarge/018/x9791190090018.jpg',
		title: '우리가 빛의 속도로 갈 수 없다면',
		author: '김연수',
	},
	{
		id: 5,
		img: 'https://www.readersnews.com/news/photo/202009/100406_67647_654.jpg',
		title: '달러구트 꿈 백화점',
		author: '이미예',
	},
	{
		id: 6,
		img: 'http://image.kyobobook.co.kr/images/book/xlarge/596/x9791187192596.jpg',
		title: '어린왕자',
		author: '생택쥐베리',
	},
	{
		id: 7,
		img: 'https://image.aladin.co.kr/product/788/3/cover500/8958284870_1.jpg',
		title: '누가 내 머리에 똥 쌌어?',
		author: 'who',
	},
	{
		id: 8,
		img: 'https://img.hankyung.com/photo/201603/BA.11350864.1.jpg',
		title: '주토피아',
		author: '@joody',
	},
	{
		id: 9,
		img: 'http://img2.tmon.kr/cdn3/deals/2020/06/03/3656253742/original_3656253742_front_e6213_1591150707production.jpg',
		title: '흥부와 놀부',
		author: 'heungbuandnolbu',
	},
	{
		id: 10,
		img: 'https://www.puzzlesarang.com/shop/data/goods/1563264794714m0.jpg',
		title: '신데렐라',
		author: 'cinderella',
	},
];

function MyLibrary() {
	return (
		<Grid align="center" className="mylibrary">
			<Grid align="center" className="mylibrary-container">
				<SubHeader name="내 서재" />
				<BookList itemData={itemData} path="/book_info/" />
			</Grid>
		</Grid>
	);
}
export default MyLibrary;
