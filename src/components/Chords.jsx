import styled from 'styled-components';
import { chords } from 'utils/constants';

const SVGText = styled.text`
	font-family: 'Roboto', sans-serif;
	font-size: ${({ fontSize }) => fontSize || '0.3rem'};
	font-weight: 500;
	fill: ${({ fill }) => fill || '#333'};
	text-anchor: middle;
`;

const Chords = ({ chordName }) => {
	const chordData = chords.find((item) => item.name === chordName);
	console.log(chordData);

	const generateCircle = (positions) => {
		return positions.map((position, index) => {
			const cx = index * 10; // Calculate cx value based on index
			if (position === 0) {
				return (
					<g key={index}>
						<circle strokeWidth='0.5' stroke='#333' fill='transparent' cx={cx} cy='-4.5' r='2'></circle>
					</g>
				);
			} else if (position === -1) {
				return (
					<g key={index}>
						<text fontSize='0.5rem' fill='#333' textAnchor='middle' x={cx} y='-2'>
							&times;
						</text>
					</g>
				);
			}

			return null; // Skip other positions
		});
	};

	// const generateDot = (item) => {
	// 	const { frets, fingers } = item;
	// 	return frets.map((position, index) => {
	// 		const cx = index * 10;
	// 		const cy = (position + (position - 1)) * 6;

	// 		if (position > 0) {
	// 			console.log(fingers[index]);
	// 			return (
	// 				<g key={index}>
	// 					<circle strokeWidth='0.25' stroke='#333' fill='#333' cx={cx} cy={cy} r='4'></circle>
	// 					<SVGText fill='#fff' fontSize='0.25rem' x={cx} y={cy + 1.5}>
	// 						{fingers[index]}
	// 					</SVGText>
	// 				</g>
	// 			);
	// 		}

	// 		return null;
	// 	});
	// };

	const generateDot = (item) => {
		const { frets, fingers, barres } = item;
		const barre = item.barres[0];

		// Hợp âm chặn
		if (barre) {
			const firstPos = item.frets.indexOf(barre);
			const lastPos = item.frets.lastIndexOf(barre);
			const barreWidth = (lastPos - firstPos) * 10;
			console.log(firstPos, lastPos);
			const barreChord = frets.map((position, index) => {
				const cx = index * 10;
				const cy = (position + (position - 1)) * 6;

				if (position > 0) {
					if (position !== barre) {
						return (
							<g key={index}>
								<circle strokeWidth='0.25' stroke='#333' fill='#333' cx={cx} cy={cy} r='4'></circle>
								<SVGText fill='#fff' fontSize='0.25rem' x={cx} y={cy + 1.5}>
									{fingers[index]}
								</SVGText>
							</g>
						);
					}

					const barreFirstX = firstPos * 10;
					const barreLastX = lastPos * 10;
					const barreY = barre * 1.9;
					console.log(item, barre);
					return (
						<g key={index} id={`haha-${index}`}>
							<circle
								strokeWidth='0.25'
								stroke='#333'
								fill='#333'
								cx={barreFirstX}
								cy={cy}
								r='4'></circle>
							<rect fill='#333' x={barreFirstX} y={barreY} width={barreWidth} height='8.5'></rect>
							<circle strokeWidth='0.25' stroke='#333' fill='#333' cx={barreLastX} cy={cy} r='4'></circle>
						</g>
					);
				}

				return null;
			});

			return barreChord;
		}

		const dots = frets.map((position, index) => {
			const cx = index * 10;
			const cy = (position + (position - 1)) * 6;

			if (position > 0) {
				return (
					<g key={index}>
						<circle strokeWidth='0.25' stroke='#333' fill='#333' cx={cx} cy={cy} r='4'></circle>
						<SVGText fill='#fff' fontSize='0.25rem' x={cx} y={cy + 1.5}>
							{fingers[index]}
						</SVGText>
					</g>
				);
			}

			return null;
		});

		return dots;
	};

	return (
		<div className='mb-10'>
			<h2 className='mb-5 font-bold text-center md:text-2xl lg:text-4xl'>{chordData.name}</h2>
			<div className='flex flex-row flex-wrap'>
				{chordData.positions.map((item, index) => (
					<div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4' key={index}>
						<svg
							width='100%'
							xmlns='http://www.w3.org/2000/svg'
							preserveAspectRatio='xMinYMin meet'
							viewBox='0 0 80 70'
							style={{ maxWidth: '100%', margin: 'auto' }}>
							<g transform='translate(12, 12)'>
								{/* 
									Horizontal line (width = 50, distance = 12, 48 = vertical height)
									M 0 0 H 50 
									M 0 12 H 50 
									M 0 24 H 50 
									M 0 36 H 50 
									M 0 48 H 50

									Vertical line (height = 48, distance = 12, 50 = horizontal width)
									M 0 0 V 48
									M 0 10 V 48
									M 0 20 V 48
									M 0 30 V 48
									M 0 40 V 48
									M 0 50 V 48
								*/}

								<g>
									<path
										stroke='#333'
										strokeWidth='0.5'
										strokeLinecap='square'
										strokeLinejoin='square'
										d='M 0 0 H 50 M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50 M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48'
									/>
									{/* Base fret !== 1 */}
									{item.baseFret !== 1 && (
										<SVGText x='-8' y='8'>
											{item.baseFret}fr
										</SVGText>
									)}

									{/* If chord starts by fret 1 */}
									{item.baseFret === 1 && (
										<path
											stroke='#333'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M 0 0 H 50'
										/>
									)}
									{generateCircle(item.frets)}
									{generateDot(item)}
									{/* {generateDot(item.frets)} */}
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
								</g>

								{/* Dots */}
								{/* <g>
									<circle strokeWidth='0.25' stroke='#333' fill='#333' cx='10' cy='30' r='4'></circle>
								</g>
								<g>
									<circle strokeWidth='0.25' stroke='#333' fill='#333' cx='20' cy='18' r='4'></circle>
								</g>
								<g>
									<circle strokeWidth='0.25' stroke='#333' fill='#333' cx='40' cy='6' r='4'></circle>
								</g> */}
							</g>
						</svg>
					</div>
				))}
			</div>
		</div>
	);
};

export default Chords;

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
