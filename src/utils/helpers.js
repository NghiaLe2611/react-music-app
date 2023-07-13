import { guitarFrets } from './constants';

export function flattenChords(chords) {
	const flattenedChords = [];

	for (const key in chords) {
		const chordVariations = chords[key];
		for (const variation of chordVariations) {
			const { key: chordKey, suffix, positions } = variation;
			const name = chordKey + suffix;
			const item = { name, key: chordKey, suffix, positions };
			flattenedChords.push(item);
		}
	}

	return flattenedChords;
}

export function mapChordToFretPositions(chordFretPositions, tuning) {
	const notes = [];
	for (let i = 0; i < chordFretPositions.length; i++) {
		const fretPosition = chordFretPositions[i];
		const stringIndex = i;
		const note = guitarFrets[stringIndex][fretPosition];
		notes.push(note);
	}
	return notes;
}

export function formatChordName(name) {
	const rootNote = name.charAt(0);
	const suffix = name.slice(1);

	if (suffix === 'major') {
		return rootNote;
	} else if (suffix === 'minor') {
		return rootNote + 'm';
	}

	return name;
}