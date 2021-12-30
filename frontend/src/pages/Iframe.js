import React, { useEffect, useState } from 'react';
const KEY = 'MD5_HASH_OF_YOUR_API_KEY';

export default function Iframely(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [html, setHtml] = useState({
		__html: '<div />',
	});
	const url = 'https://www.yahoo.com';

	return (
		<div>
			<body>
				<iframe
					title="boy"
					src="https://answergarden.ch/"
					width="100%"
					height="500"
					allowfullscreen
					sandbox
				>
					<p>
						<a href="/en-US/docs/Glossary">
							Fallback link for browsers that don't support iframes
						</a>
					</p>
				</iframe>
			</body>
		</div>
	);
}
