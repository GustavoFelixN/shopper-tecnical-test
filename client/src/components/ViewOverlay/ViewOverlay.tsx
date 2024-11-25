import React from 'react';

const ViewOverlay: React.FC = () => {
	return (
		<div style={{
			position: 'absolute',
			top: 0,
			left: 0,
			width: '33%',
			height: '90vh',
			backgroundColor: 'rgb(255, 255, 255, 0.8)',
			padding: '20px',
			margin: '25px',
			borderRadius: '50px',
			zIndex: 10,
		}}>
		</div>
	);
};

export default ViewOverlay;
