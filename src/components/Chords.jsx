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

	const generateDot = (item) => {
		const barreHeight = 8.5;
		const { frets, fingers, barres } = item;
		const barre = barres[0];

		// Hợp âm chặn
		if (barre) {
			let chordElements = [];
			const firstPos = item.frets.indexOf(barre);
			const lastPos = item.frets.lastIndexOf(barre);
			const barreWidth = (lastPos - firstPos) * 10;
			const barreY = (barre + (barre - 1)) * 6 - barreHeight/2;
			const barreFirstX = firstPos * 10;
			// const barreLastX = lastPos * 10;

			frets.forEach((position, index) => {
				const cx = index * 10;
				const cy = (position + (position - 1)) * 6;

				if (position > 0) {
					if (position !== barre) {
						chordElements.push(
							<g key={index}>
								<circle strokeWidth='0.25' stroke='#333' fill='#333' cx={cx} cy={cy} r='4'></circle>
								<SVGText fill='#fff' fontSize='0.25rem' x={cx} y={cy + 1.5}>
									{fingers[index]}
								</SVGText>
							</g>
						);
					} 
					else if (index === firstPos || index === lastPos) {
						chordElements.push(
							<g key={index}>
								<circle strokeWidth='0.25' stroke='#333' fill='#333' cx={cx} cy={cy} r='4'></circle>
							</g>
						);
					}
				}
			});

			chordElements.push(
				<g key='barre'>
					<rect fill='#333' x={barreFirstX} y={barreY} width={barreWidth} height={barreHeight}></rect>
				</g>
			);

			return chordElements;
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
							</g>
						</svg>
					</div>
				))}
			</div>
		</div>
	);
};

export default Chords;