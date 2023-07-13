import data from 'data/data.json';
import { flattenChords } from './helpers';

const parseData = JSON.parse(JSON.stringify(data));
const keyNames = [
	'C', 'Csharp', 'D', 'Dsharp', 'E', 'F', 'Fsharp', 'G', 'Ab', 'A', 'Bb', 'B'
]


export const guitarFrets = [
	// E string
	[
		'E2',
		'F2',
		'F#2',
		'G2',
		'G#2',
		'A2',
		'A#2',
		'B2',
		'C3',
		'C#3',
		'D3',
		'D#3',
		'E3',
		'F3',
		'F#3',
		'G3',
		'G#3',
		'A3',
		'A#3',
		'B3',
		'C4',
		'C#4',
		'D4',
		'D#4',
		'E4',
	],
	// A string
	[
		'A2',
		'A#2',
		'B2',
		'C3',
		'C#3',
		'D3',
		'D#3',
		'E3',
		'F3',
		'F#3',
		'G3',
		'G#3',
		'A3',
		'A#3',
		'B3',
		'C4',
		'C#4',
		'D4',
		'D#4',
		'E4',
		'F4',
		'F#4',
		'G4',
		'G#4',
		'A4',
	],
	// D string
	[
		'D3',
		'D#3',
		'E3',
		'F3',
		'F#3',
		'G3',
		'G#3',
		'A3',
		'A#3',
		'B3',
		'C4',
		'C#4',
		'D4',
		'D#4',
		'E4',
		'F4',
		'F#4',
		'G4',
		'G#4',
		'A4',
		'A#4',
		'B4',
		'C5',
		'C#5',
		'D5',
	],
	// G string
	[
		'G3',
		'G#3',
		'A3',
		'A#3',
		'B3',
		'C4',
		'C#4',
		'D4',
		'D#4',
		'E4',
		'F4',
		'F#4',
		'G4',
		'G#4',
		'A4',
		'A#4',
		'B4',
		'C5',
		'C#5',
		'D5',
		'D#5',
		'E5',
		'F5',
		'F#5',
		'G5',
	],
	// B string
	[
		'B3',
		'C4',
		'C#4',
		'D4',
		'D#4',
		'E4',
		'F4',
		'F#4',
		'G4',
		'G#4',
		'A4',
		'A#4',
		'B4',
		'C5',
		'C#5',
		'D5',
		'D#5',
		'E5',
		'F5',
		'F#5',
		'G5',
		'G#5',
		'A5',
		'A#5',
		'B5',
	],
	// High E string
	[
		'E4',
		'F4',
		'F#4',
		'G4',
		'G#4',
		'A4',
		'A#4',
		'B4',
		'C5',
		'C#5',
		'D5',
		'D#5',
		'E5',
		'F5',
		'F#5',
		'G5',
		'G#5',
		'A5',
		'A#5',
		'B5',
		'C6',
		'C#6',
		'D6',
		'D#6',
		'E6',
	],
];

export const tuning = parseData.tunings.standard;
export const keys = parseData.keys.map((key, index) => {
	return {
		key: key,
		name: keyNames[index]
	}
});

export const suffixes = parseData.suffixes;
export const chords = flattenChords(parseData.chords);
// export const groupedChords = chords.reduce((acc, chord) => {
// 	const { key } = chord;
// 	if (!acc[key]) {
// 		acc[key] = [];
// 	}
// 	acc[key].push(chord);

// 	// Sort the grouped chords by name in ascending order
// 	// for (const key in acc) {
// 	// 	acc[key].sort((a, b) => a.name.localeCompare(b.name));
// 	// }

// 	return acc;
// }, {});

export const allChords = Object.entries(parseData.chords).flatMap(([key, values]) =>
	values.map(({ key: valueKey, suffix, positions }) => ({
		name: `${valueKey}${suffix}`,
		key: valueKey,
		suffix,
		positions: positions.slice(0, 1), // get first item only
	}))
);

// https://tombatossals.github.io/react-chords/
// https://github.com/tombatossals/react-chords
// https://stackoverflow.com/questions/52511653/drawing-guitar-chords-dynamically
// https://github.com/tombatossals/chords-db/blob/master/lib/guitar.json
// https://github.com/T-vK/chord-collection
// https://gschoppe.com/js/json-chords/
