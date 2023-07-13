import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { keys } from 'utils/constants';

const Li = styled.li`
	color: #2563eb;
	margin-bottom: 5px;
	a {
		padding: 5px 10px;
		border-radius: 4px;
	}
	&.active a {
		color: #fff;
		background-color: #2563eb;
	}
	&:not(.active):hover a {
		background-color: #e0f2fe;
	}
	@media (min-width: 1024px) {
		margin-right: 20px;
	}
`;

const ChordListComponent = () => {
	const location = useLocation();
	const isActive = location.pathname === '/';
	const chordName = location.pathname.split("/").pop();

	return (
		<div>
			<h1 className='text-4xl font-bold text-center mb-10'>Guitar Chords Database</h1>
			<div className='flex flex-col lg:flex-row mb-10'>
				<span>Keys:</span>
				<ul className='flex lg:ml-5 flex-wrap'>
					<Li className={isActive ? 'active' : ''}>
						<Link to='/'>All</Link>
					</Li>
					{keys.map((item) => (
						<Li key={item.key} className={chordName === item.name ? 'active' : ''}>
							<Link to={`/chords/${item.name}`}>{item.key}</Link>
						</Li>
					))}
				</ul>
			</div>
		</div>
	);
};
const ChordList = memo(ChordListComponent);

export default ChordList;
