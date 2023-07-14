import {memo, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {guitarFrets} from 'utils/constants';
import {formatChordName} from 'utils/helpers';
import PlayChord from './PlayChord';

const SVGText = styled.text`
	font-family: 'Roboto', sans-serif;
	font-size: ${({fontSize}) => fontSize || '0.3rem'};
	font-weight: 500;
	fill: ${({fill}) => fill || '#333'};
	text-anchor: middle;
`;


const ChordComponent = ({data}) => {
	const chordData = data.positions[0];
	const {frets, baseFret} = chordData;
	// console.log(chordData.midi);

	const chordArr = useMemo(() => {
		return frets
			.map((position, stringIndex) => {
				if (position >= 0) {
					const chordPos = baseFret > 1 ? position + baseFret : position;
					return guitarFrets[stringIndex][chordPos];
				}
				return null;
			})
			.filter((value) => value !== null);
	}, [frets, baseFret]);

	const generateCircle = useCallback((positions) => {
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
	}, []);

	const generateDot = useCallback((item) => {
		const barreHeight = 8.5;
		const {frets, fingers, barres} = item;
		const barre = barres[0];

		// Hợp âm chặn
		if (barre) {
			let chordElements = [];
			const firstPos = item.frets.indexOf(barre);
			const lastPos = item.frets.lastIndexOf(barre);
			const barreWidth = (lastPos - firstPos) * 10;
			const barreY = (barre + (barre - 1)) * 6 - barreHeight / 2;
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
							</g>,
						);
					} else if (index === firstPos || index === lastPos) {
						chordElements.push(
							<g key={index}>
								<circle strokeWidth='0.25' stroke='#333' fill='#333' cx={cx} cy={cy} r='4'></circle>
							</g>,
						);
					}
				}
			});

			chordElements.push(
				<g key='barre'>
					<rect fill='#333' x={barreFirstX} y={barreY} width={barreWidth} height={barreHeight}></rect>
				</g>,
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
	}, []);

	// return <div></div>;
	return (
		<div className='mb-10'>
			<h2 className='font-bold text-center'>{formatChordName(data.name)}</h2>
			<svg width='100%' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 80 70' style={{maxWidth: '100%', margin: 'auto'}}>
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
						{baseFret !== 1 && (
							<SVGText x='-8' y='8'>
								{baseFret}fr
							</SVGText>
						)}

						{/* If chord starts by fret 1 */}
						{baseFret === 1 && <path stroke='#333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' d='M 0 0 H 50' />}
						{generateCircle(frets)}
						{generateDot(chordData)}
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
			<div className='text-center'>
				{/* <PlayChord guitarChord={chordArr} /> */}
				<PlayChord guitarChord={chordData.midi} />
				
			</div>
		</div>
	);
};
const Chord = memo(ChordComponent);

export default Chord;
