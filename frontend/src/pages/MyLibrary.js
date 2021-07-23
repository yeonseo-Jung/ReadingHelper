import React from 'react';
import { Grid, Typography, Button, Card, CardMedia, CardContent, CardActions, CardActionArea } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';

const itemData = [
	{
		img: 'https://cdn.pixabay.com/photo/2018/01/10/23/53/rabbit-3075088_960_720.png',
		title: '토끼의 하루',
		author: 'dok2',
	},
	{
		img: 'https://www.fashionn.com/files/board/2015/image/p19r7o9qe1av7a681aapaaj1com1.jpg',
		title: '인사이드 아웃',
		author: '기쁨이',
	},
	{
		img: 'http://image.kyobobook.co.kr/images/book/xlarge/453/x9788967356453.jpg',
		title: '심슨 가족이 사는 법',
		author: '@Simpsons',
	},
	{
		img: 'http://image.kyobobook.co.kr/images/book/xlarge/018/x9791190090018.jpg',
		title: '우리가 빛의 속도로 갈 수 없다면',
		author: '김연수',
	},
	{
		img: 'https://www.readersnews.com/news/photo/202009/100406_67647_654.jpg',
		title: '달러구트 꿈 백화점',
		author: '이미예',
	},
	{
		img: 'http://image.kyobobook.co.kr/images/book/xlarge/596/x9791187192596.jpg',
		title: '어린왕자',
		author: '생택쥐베리',
	},
	{
		img: 'https://image.aladin.co.kr/product/788/3/cover500/8958284870_1.jpg',
		title: '누가 내 머리에 똥 쌌어?',
		author: 'who',
	},
	{
		img: 'https://img.hankyung.com/photo/201603/BA.11350864.1.jpg',
		title: '주토피아',
		author: '@joody',
	},
	{
		img: 'http://img2.tmon.kr/cdn3/deals/2020/06/03/3656253742/original_3656253742_front_e6213_1591150707production.jpg',
		title: '흥부와 놀부',
		author: 'heungbuandnolbu',
	},
	{
		img: 'https://www.puzzlesarang.com/shop/data/goods/1563264794714m0.jpg',
		title: '신데렐라',
		author: 'cinderella',
	},
];

function MyLibrary() {
	return (
		<Grid align="center" className="mylibrary">
			<Grid align="center" className="mylibrary-container">
				<Grid container className="library-typo">
					OO 님의 서재
				</Grid>
				<Grid className="library-line" />
				<Grid container spacing={2} className="booklist" align="center">
					{itemData.map((item) => (
						<Grid item xs={4} className="bookCard">
							<Card className="bookSection">
								<CardActionArea>
									<CardMedia
										className="bookImage"
										component="img"
										image={item.img}
										title="Paella dish"
									/>
									<CardContent className="bookCardContent">
										<Typography variant="body1" className="btitle">
											{item.title}
										</Typography>
										<Typography variant="body2" className="bauthor">
											{item.author}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Grid className="buttons">
										<Button size="small" color="primary" className="btnDelete">
											<DeleteOutlineIcon />
											삭제
										</Button>
										<Button size="small" color="primary" className="btnWriteBR">
											<ArtTrackIcon style={{ marginRight: '5px' }} />
											독후감 작성
										</Button>
									</Grid>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}
export default MyLibrary;
