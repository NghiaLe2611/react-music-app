import Chord from 'components/Chord';
import ChordList from 'components/ChordList';
import { allChords } from 'utils/constants';

const HomePage = () => {
    return (
		<div>
            <ChordList />
			<div className='flex flex-row flex-wrap'>
				{allChords.map((item) => (
					<div className='w-1/2 sm:w-1/3 2xl:w-1/6 mb-5' key={item.name}>
                        <Chord data={item} />
                    </div>
				))}
			</div>
		</div>
	);
};

export default HomePage;