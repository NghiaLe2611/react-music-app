import { createContext, useEffect, useRef, useState } from 'react';
import { instrument, setMasterGain } from 'soundfont-player';

export const ChordContext = createContext(null);

// Sử dụng audio context chung cho toàn bộ để tránh trường hợp lag nếu có quá nhiều audio context trong chord component
const ChordProvider = ({ children }) => {
	const [instrumentName, setInstrumentName] = useState('acoustic_guitar_steel');
	const [player, setPlayer] = useState(null);

	const audioCtx = useRef(null);

	// useEffect(() => {
	// 	const createAudioContext = async () => {
	// 		try {
	// 			const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	// 			audioCtx.current = audioContext;
	// 			const soundfont = await instrument(audioContext, instrumentName);
	// 			setPlayer(soundfont);
	// 		} catch (error) {
	// 			console.error('Failed to create AudioContext:', error);
	// 		}
	// 	};

	// 	createAudioContext();

	// 	return () => {
	// 		if (audioCtx.current) {
	// 			audioCtx.current.close();
	// 		}
	// 	};
	// }, [instrumentName]);

	useEffect(() => {
		const createAudioContext = async () => {
			try {
				const audioContext = new (window.AudioContext || window.webkitAudioContext)();
				audioCtx.current = audioContext;
				const soundfont = await instrument(audioContext, instrumentName);
				setPlayer(soundfont);
			} catch (error) {
				console.error('Failed to create AudioContext:', error);
			}
		};

		// Create AudioContext only on user gesture
		const handleCreateContext = () => {
			createAudioContext();
		};

		window.addEventListener('load', handleCreateContext);

		return () => {
			window.removeEventListener('load', handleCreateContext);

			if (audioCtx.current) {
				audioCtx.current.close();
			}
		};
	}, [instrumentName]);

	return (
		<ChordContext.Provider
			value={{
				player: player,
				audioContext: audioCtx.current,
			}}>
			{children}
		</ChordContext.Provider>
	);
};

export default ChordProvider;
