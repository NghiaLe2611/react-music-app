import { memo } from 'react';
import { styled } from 'styled-components';
import { guitarFrets, tuning } from 'utils/constants';

const Li = styled.li`
	display: block;
	background-color: #ba9;
	background-image: repeating-linear-gradient(50deg, rgba(128, 110, 1, 0.6), transparent 0.15em, transparent 0.2em),
		linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.3) 10%,
			hsla(0, 0%, 100%, 0.25) 15%,
			hsla(0, 0%, 100%, 0.8) 30%,
			hsla(0, 0%, 100%, 0.25) 45%,
			rgba(128, 110, 1, 0.6) 90%
		);
	&.string-6 {
		height: 6px;
	}
	&.string-5 {
		height: 5px;
	}
	&.string-4 {
		height: 4px;
	}
	&.string-3 {
		height: 3px;
	}
	&.string-2 {
		height: 2px;
		background-image: repeating-linear-gradient(50deg, rgba(255, 255, 255, 0.6), transparent 0.15em, transparent 0.2em),
		linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.3) 10%,
			hsla(0, 0%, 100%, 0.25) 15%,
			hsla(0, 0%, 100%, 0.8) 30%,
			hsla(0, 0%, 100%, 0.25) 45%,
			rgba(255, 255, 255, 0.6) 90%
		);
	}
	&.string-1 {
		height: 2px;
		background-image: repeating-linear-gradient(50deg, rgba(255, 255, 255, 0.6), transparent 0.15em, transparent 0.2em),
		linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.3) 10%,
			hsla(0, 0%, 100%, 0.25) 15%,
			hsla(0, 0%, 100%, 0.8) 30%,
			hsla(0, 0%, 100%, 0.25) 45%,
			rgba(255, 255, 255, 0.6) 90%
		);
	}
`;

const Div = styled.div`
	position: relative;

	.head {
		width: 100px;
		height: 220px;
		background-image: url('images/head.jpg');
		background-repeat: no-repeat;
		position: relative;
		&:after,
		&:before {
			content: '';
			position: absolute;
			width: 100px;
			height: 100px;
			border-radius: 50%;
			background-color: #fff;
		}
		&:before {
			top: -80px;
			left: 40px;
		}
		&:after {
			bottom: -80px;
			left: 40px;
		}
	}

	.body {
		position: absolute;
		left: 100px;
		top: 50%;
		transform: translateY(-50%);
		width: 500px;
		height: 180px;
		&:before {
			content: '';
			display: block;
			background-image: url('images/pattern.png');
			background-repeat: repeat-y;
			background-size: 100% 100%;
			// background-color: #683C2F;
			width: 500px;
			height: 180px;
		}

		.frets{
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: space-between;
			
			li {
				width: 2px;
				height: 100%;
				background-color: #a6a6a6;
			}
		}

		.strings{
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background: transparent;
			position: absolute;
			top: 0;
			left: 0;
			padding: 10px 0;
		}
	}
`;

const GuitarComponent = () => {
	const guitarTune = [...tuning].reverse();
	return (
		<div style={{ padding: 50 }}>
			{/* <img src='/images/guitar.png' /> */}
			<Div className='guitar'>
				<div className='head'></div>
				<div className='body'>
					{/* {tuning.reverse().map((item) => (
						<div key={item}>{item}</div>
					))} */}
					<ul className='frets'>
						{[...Array(21)].map((el, index) => (
							<li key={index}></li>
						))}
					</ul>
					<ul className='strings'>
						{guitarFrets.map((item, index) => (
							<Li
								style={{ height: `${index + 3}px` }}
								className={`string-${index + 1}`}
								key={guitarTune[index]}>
								{/* {JSON.stringify(item)} */}
							</Li>
						))}
					</ul>
				</div>
			</Div>
		</div>
	);
};
const Guitar = memo(GuitarComponent);

export default Guitar;
