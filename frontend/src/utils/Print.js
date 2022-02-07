import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import OrderSummary from '../pages/OrderSummary';

const Print = () => {
	const componentRef = useRef();

	return (
		<div>
			<OrderSummary ref={componentRef} />
			<ReactToPrint
				trigger={() => <button>Print this out!</button>}
				content={() => componentRef.current}
			/>
		</div>
	);
};

export default Print;
