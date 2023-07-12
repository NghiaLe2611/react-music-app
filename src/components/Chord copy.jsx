import styled from 'styled-components';

const SVGText = styled.text`
	font-family: 'Roboto', sans-serif;
	font-size: 0.3rem;
	font-weight: 500;
	fill: #333;
	text-anchor: middle;
`;

const Chord = ({ chordName }) => {
	return (
		<svg
			width='100%'
			xmlns='http://www.w3.org/2000/svg'
			preserveAspectRatio='xMinYMin meet'
			viewBox='0 0 80 70'
			style={{ maxWidth: '100%', margin: 'auto' }}>
			<g transform='translate(12, 12)'>
				<g>
					<path
						stroke='#333'
						strokeWidth='0.5'
						strokeLinecap='square'
						strokeLinejoin='square'
						d='M 0 0 H 50 M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50 M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48'
					/>
					{/* If chord starts by fret 1 */}
					<path stroke='#333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' d='M 0 0 H 50' />

					<g>
						<SVGText x='0' y='55'>
							E2
						</SVGText>
						<SVGText x='10' y='55'>
							A2
						</SVGText>
						<SVGText x='20' y='55'>
							D3
						</SVGText>
						<SVGText x='30' y='55'>
							G3
						</SVGText>
						<SVGText x='40' y='55'>
							B3
						</SVGText>
						<SVGText x='50' y='55'>
							E4
						</SVGText>
					</g>

					{/* 
					Horizontal line (width = 50, distance = 12, 48 = vertical height)
					M 0 0 H 50 
					M 0 12 H 50 
					M 0 24 H 50 
					M 0 36 H 50 
					M 0 48 H 50

					Vertical line (height = 48, distance = 12, 50 = horizontal width)
					M 0 0 V 48
					M 0 10 V 40
					M 0 20 V 40
					M 0 30 V 40
					M 0 40 V 40
					M 0 50 V 40
				*/}
				</g>
				<g>
					<text fontSize='0.5rem' fill='#333' textAnchor='middle' x='0' y='-2'>
						&times;
					</text>
				</g>
				<g>
					<circle strokeWidth='0.5' stroke='#333' fill='transparent' cx='10' cy='-4.5' r='2'></circle>
				</g>
				<g>
					<circle strokeWidth='0.5' stroke='#333' fill='transparent' cx='20' cy='-4.5' r='2'></circle>
				</g>
				<g>
					<circle strokeWidth='0.5' stroke='#333' fill='transparent' cx='30' cy='-4.5' r='2'></circle>
				</g>
				<g>
					<circle strokeWidth='0.5' stroke='#333' fill='transparent' cx='40' cy='-4.5' r='2'></circle>
				</g>
				<g>
					<circle strokeWidth='0.5' stroke='#333' fill='transparent' cx='50' cy='-4.5' r='2'></circle>
				</g>
				{/* <g>
					<circle strokeWidth='0.25' stroke='#333' fill='#333' cx='10' cy='30' r='4'></circle>
					<text fontSize='0.2rem' textAnchor='middle' fill='white' x='10' y='31.5'>
						2
					</text>
				</g>
				<g>
					<circle strokeWidth='0.25' stroke='#333' fill='#333' cx='20' cy='18' r='4'></circle>
					<text fontSize='0.2rem' textAnchor='middle' fill='white' x='20' y='19.5'>
						1
					</text>
				</g> */}
			
				{/* <g>
					<circle strokeWidth='0.25' stroke='#333' fill='#333' cx='40' cy='30' r='4'></circle>
					<text fontSize='0.2rem' textAnchor='middle' fill='white' x='40' y='31.5'>
						3
					</text>
				</g> */}
				
			</g>
		</svg>
	);
};

export default Chord;

{
	/* <svg width='100%' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 80 70'>
	<g transform='translate(13, 13)'>
		<g>
			<path
				stroke='#333'
				strokeWidth='0.25'
				strokeLinecap='square'
				strokeLinejoin='square'
				d='M 0 0 H 50 M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48'></path>
			<path
				stroke='#333'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M 0 0 H 50'></path>
			<g>
				<text fontSize='0.3rem' fill='#333' fontFamily='Verdana' textAnchor='middle' x='0' y='53'>
					E2
				</text>
				<text fontSize='0.3rem' fill='#333' fontFamily='Verdana' textAnchor='middle' x='10' y='53'>
					A2
				</text>
				<text fontSize='0.3rem' fill='#333' fontFamily='Verdana' textAnchor='middle' x='20' y='53'>
					D3
				</text>
				<text fontSize='0.3rem' fill='#333' fontFamily='Verdana' textAnchor='middle' x='30' y='53'>
					G3
				</text>
				<text fontSize='0.3rem' fill='#333' fontFamily='Verdana' textAnchor='middle' x='40' y='53'>
					B3
				</text>
				<text fontSize='0.3rem' fill='#333' fontFamily='Verdana' textAnchor='middle' x='50' y='53'>
					E4
				</text>
			</g>
		</g>
		<text fontSize='0.7rem' fill='#333' fontFamily='Verdana' textAnchor='middle' x='0' y='-2'>
			x
		</text>
		<g>
			<circle strokeWidth='0.25' stroke='#333' fill='#333' cx='10' cy='30' r='4'></circle>
			<text fontSize='3pt' fontFamily='Verdana' textAnchor='middle' fill='white' x='10' y='31.5'>
				3
			</text>
		</g>
		<g>
			<circle strokeWidth='0.25' stroke='#333' fill='#333' cx='20' cy='18' r='4'></circle>
			<text fontSize='3pt' fontFamily='Verdana' textAnchor='middle' fill='white' x='20' y='19.5'>
				2
			</text>
		</g>
		<g>
			<circle strokeWidth='0.25' stroke='#333' fill='transparent' cx='30' cy='-4' r='2'></circle>
		</g>
		<g>
			<circle strokeWidth='0.25' stroke='#333' fill='#333' cx='40' cy='6.5' r='4'></circle>
			<text fontSize='3pt' fontFamily='Verdana' textAnchor='middle' fill='white' x='40' y='8'>
				1
			</text>
		</g>
		<g>
			<circle strokeWidth='0.25' stroke='#333' fill='transparent' cx='50' cy='-4' r='2'></circle>
		</g>
	</g>
</svg> */
}
