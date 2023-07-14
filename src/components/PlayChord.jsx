import { memo, useContext, useEffect } from 'react';
import { ChordContext } from 'context/ChordContext';
import { getFrequency, getNoteNameFromMidi } from 'utils/constants';

const ChordButton = ({ guitarChord }) => {
	const chordCtx = useContext(ChordContext);
	const { player, audioContext } = chordCtx;

	// useEffect(() => {
	// 	if (audioContext) {
	// 		// Audio context already exists, set up the audio graph
	// 		const delayNode = audioContext.createDelay();
	// 		const feedbackNode = audioContext.createGain();
	// 		const wetNode = audioContext.createGain();

	// 		delayNode.delayTime.value = 0.5; // Adjust the delay time as desired
	// 		feedbackNode.gain.value = 0.5; // Adjust the feedback level as desired
	// 		wetNode.gain.value = 0.5; // Adjust the wet level as desired

	// 		// Connect the nodes in the audio graph
	// 		delayNode.connect(feedbackNode);
	// 		feedbackNode.connect(delayNode);
	// 		delayNode.connect(wetNode);
	// 		wetNode.connect(audioContext.destination);
	// 	}
	// }, [audioContext]);

	// when using note
	// const playNote = (note, time) => {
	// 	console.log(123, note);
	// 	return new Promise((resolve) => {
	// 		setTimeout(async () => {
	// 			if (audioContext) {
	// 				const frequency = getFrequency(note);
	// 				/* calculate the frequency of the note based on its name */
	// 				// Adjust this calculation based on your requirements

	// 				// Create an empty mono audio buffer with a duration of 1 second
	// 				const duration = 1;
	// 				const bufferSize = audioContext.sampleRate * duration;
	// 				const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	// 				const channelData = buffer.getChannelData(0);

	// 				// Generate the waveform for the note
	// 				for (let i = 0; i < bufferSize; i++) {
	// 					const t = i / audioContext.sampleRate; // Calculate the time for the current sample
	// 					const value = Math.sin(2 * Math.PI * frequency * t); // Generate a sine wave for the current sample
	// 					channelData[i] = value;
	// 				}

	// 				// Create a buffer source node and connect it to the destination
	// 				const source = audioContext.createBufferSource();
	// 				source.buffer = buffer;
	// 				source.connect(audioContext.destination);
	// 				source.start(audioContext.currentTime + time);

	// 				resolve();
	// 			}
	// 		}, time);
	// 	});
	// }

	const stopNote = async (noteNames) => {
		if (player && audioContext) {
			const currentTime = audioContext.currentTime;
			const noteIds = await Promise.all(noteNames.map((noteName) => player.getPlayId(noteName)));
			await Promise.all(noteIds.map((noteId) => player.stop(noteId, currentTime)));
		}
	};

	// const playNote = (note, time) => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(async () => {
	// 			if (player && audioContext) {
	// 				await player.play(note, audioContext.currentTime);
	// 				resolve();
	// 			}
	// 		}, time);
	// 	});
	// };

	const playNote = (note, time) => {
		return new Promise((resolve) => {
		  setTimeout(async () => {
			if (player && audioContext) {
			  const source = audioContext.createBufferSource();
			  const gainNode = audioContext.createGain();
			  const delayNode = audioContext.createDelay();
			  const feedbackNode = audioContext.createGain();
			  const wetNode = audioContext.createGain();
	  
			  // Set up delay parameters
			  delayNode.delayTime.value = 0.2; // Adjust the delay time as desired
			  feedbackNode.gain.value = 0.4; // Adjust the feedback level as desired
			  wetNode.gain.value = 0.3; // Adjust the wet level as desired
	  
			  // Connect the audio nodes
			  source.buffer = /* Audio buffer for the specific note */;
			  source.connect(gainNode);
			  gainNode.connect(delayNode);
			  gainNode.connect(audioContext.destination);
			  delayNode.connect(feedbackNode);
			  feedbackNode.connect(delayNode);
			  delayNode.connect(wetNode);
			  wetNode.connect(audioContext.destination);
	  
			  // Play the note with the desired timing
			  source.start(audioContext.currentTime + time);
	  
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
		const noteNames = chord.map((midiNote) => getNoteNameFromMidi(midiNote));
		console.log(123, noteNames);
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
		// <button onClick={() => playNote('C4')}>Play</button>
	);
};
const PlayChord = memo(ChordButton);

export default PlayChord;
