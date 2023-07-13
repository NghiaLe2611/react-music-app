import Chord from 'components/Chord';
import ChordList from 'components/ChordList';
import { useParams } from 'react-router-dom';
import { allChords, keys } from 'utils/constants';

const ChordPage = () => {
	const { name } = useParams();
	const chordObj = keys.find(item => item.name === name);
	const chordItems = allChords.filter((item) => item.key === chordObj.key);
	
	return (
		<div>
			<ChordList />
			<div className='flex flex-row flex-wrap'>
				{chordItems.map((item) => (
					<div className='w-1/2 sm:w-1/3 2xl:w-1/6 mb-5' key={item.name}>
						<Chord data={item} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ChordPage;
