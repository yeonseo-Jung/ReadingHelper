import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Paper } from '@material-ui/core';

const SubHeader = ({ name }) => {
	return (
		<Grid container>
			<Grid className="subheader">{name}</Grid>
			<Grid className="subheader-line" />
		</Grid>
	);
};

export default SubHeader;
