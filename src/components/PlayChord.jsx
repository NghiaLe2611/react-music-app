import {ChordContext} from 'context/ChordContext';
import {memo, useContext} from 'react';

const ChordButton = ({guitarChord}) => {
	const chordCtx = useContext(ChordContext);
	const {player, audioContext} = chordCtx;

	const playNote = (note, time) => {
		return new Promise((resolve) => {
			setTimeout(async () => {
				if (player && audioContext) {
					await player.play(note, audioContext.currentTime);
					resolve();
				}
			}, time);
		});
	};

	const playChord = async (chord) => {
		// if (player && audioContext) {
		// 	const currentTime = audioContext.currentTime;
		// 	const promises = chord.map((note) => player.play(note, currentTime));
		// 	await Promise.all(promises);
		// }

		if (player && audioContext) {
			const strumDuration = 100; // Adjust the strum duration as desired
			const delayBetweenNotes = strumDuration / chord.length;

			for (let i = 0; i < chord.length; i++) {
				const note = chord[i];
				const time = i * delayBetweenNotes;
				await playNote(note, time);
			}
		}
	};

	return (
		<button
			onClick={() => {
				audioContext.resume().then(() => {
					playChord(guitarChord);
				});
			}}
			type='button'
			className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
			Play
		</button>
	);
};
const PlayChord = memo(ChordButton);

export default PlayChord;
