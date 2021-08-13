import React from 'react';
import { Grid } from '@material-ui/core';
import Loader from 'react-loader-spinner';

function LoadSpinner({ type }) {
	return (
		<Grid container className="loadspinner">
			<Loader type={type ? `${type}` : 'Oval'} color="#fdd45a" height={45} width={45} timeout={3000} />
		</Grid>
	);
}
export default LoadSpinner;
