import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import BookList from '../components/BookList';
import SubHeader from '../components/SubHeader';

function MyLibrary({ uid }) {
	const [itemData, setItemData] = useState([]);

	useEffect(() => {
		console.log('내 서재 들어옴!');
		async function loadLibrary() {
			try {
				const result = await axios.get('/mylib', {
					params: { id: uid },
				});
				const re = result.data;
				setItemData(re);
			} catch (e) {
				console.log(e);
			}
		}
		loadLibrary();
	}, []);

	return (
		<Grid align="center" className="mylibrary">
			<Grid align="center" className="mylibrary-container">
				<SubHeader name="내 서재" />
				<BookList from={1} itemData={itemData} path="/book_info/" />
			</Grid>
		</Grid>
	);
}
export default MyLibrary;
