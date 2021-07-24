import React from 'react';
import { Button } from '@material-ui/core';

const RoundButton = ({ backColor, textColor, text }) => {
	const styles = {
		borderRadius: 20,
		backgroundColor: backColor ? `${backColor}` : '#fdd45a',
		color: textColor ? `${textColor}` : '#ffffff',
	};
	return (
		<Button style={styles} variant="contained">
			{text}
		</Button>
	);
};

export default RoundButton;
