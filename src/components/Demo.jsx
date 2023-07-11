import { useEffect, useRef, useState } from 'react';
import { instrument } from 'soundfont-player';

const flattenChords = (chords) => {
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
};

// Example usage
const chords = {
	C: [
		{
			key: 'C',
			suffix: 'major',
			positions: [
				{
					frets: [-1, 3, 2, 0, 1, 0],
					fingers: [0, 3, 2, 0, 1, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 52, 55, 60, 64],
				},
				{
					frets: [-1, 1, 3, 3, 3, 1],
					fingers: [0, 1, 2, 3, 4, 1],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [48, 55, 60, 64, 67],
				},
				{
					frets: [-1, -1, 1, 1, 1, 4],
					fingers: [0, 0, 1, 1, 1, 4],
					barres: [1],
					baseFret: 5,
					midi: [55, 60, 64, 72],
				},
				{
					frets: [1, 3, 3, 2, 1, 1],
					fingers: [1, 3, 4, 2, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 55, 60, 64, 67, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: 'minor',
			positions: [
				{
					frets: [-1, 3, 1, 0, 1, 3],
					fingers: [0, 3, 2, 0, 1, 4],
					baseFret: 1,
					barres: [],
					midi: [48, 51, 55, 60, 67],
				},
				{
					frets: [1, 1, 3, 3, 2, 1],
					fingers: [1, 1, 3, 4, 2, 1],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [43, 48, 55, 60, 63, 67],
				},
				{
					frets: [4, 2, 1, 1, -1, -1],
					fingers: [4, 2, 1, 1, 0, 0],
					barres: [1],
					baseFret: 5,
					midi: [48, 51, 55, 60],
				},
				{
					frets: [1, 3, 3, 1, 1, 1],
					fingers: [1, 3, 4, 1, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 55, 60, 63, 67, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: 'dim',
			positions: [
				{
					frets: [-1, 3, 1, -1, 1, 2],
					fingers: [0, 4, 1, 0, 2, 3],
					baseFret: 1,
					barres: [],
					midi: [48, 51, 60, 66],
				},
				{
					frets: [-1, 1, 2, 3, 2, -1],
					fingers: [0, 1, 2, 4, 3, 0],
					baseFret: 3,
					barres: [],
					midi: [48, 54, 60, 63],
				},
				{
					frets: [3, 1, -1, 3, 2, -1],
					fingers: [3, 1, 0, 4, 2, 0],
					baseFret: 6,
					barres: [],
					midi: [48, 51, 63, 66],
				},
				{
					frets: [-1, -1, 1, 2, -1, 2],
					fingers: [0, 0, 1, 2, 0, 3],
					baseFret: 10,
					barres: [],
					midi: [60, 66, 75],
				},
			],
		},
		{
			key: 'C',
			suffix: 'dim7',
			positions: [
				{
					frets: [-1, -1, 1, 2, 1, 2],
					fingers: [0, 0, 1, 3, 2, 4],
					baseFret: 1,
					barres: [],
					midi: [51, 57, 60, 66],
				},
				{
					frets: [-1, 3, 4, 2, 4, 2],
					fingers: [0, 2, 3, 1, 4, 1],
					barres: [2],
					capo: true,
					baseFret: 1,
					midi: [48, 54, 57, 63, 66],
				},
				{
					frets: [2, -1, 1, 2, 1, -1],
					fingers: [2, 0, 1, 3, 1, 0],
					barres: [1],
					baseFret: 7,
					midi: [48, 57, 63, 66],
				},
				{
					frets: [-1, -1, 1, 2, 1, 2],
					fingers: [0, 0, 1, 3, 1, 4],
					barres: [1],
					baseFret: 10,
					midi: [60, 66, 69, 75],
				},
			],
		},
		{
			key: 'C',
			suffix: 'sus2',
			positions: [
				{
					frets: [-1, 3, 0, 0, 1, 3],
					fingers: [0, 3, 0, 0, 1, 4],
					baseFret: 1,
					barres: [],
					midi: [48, 50, 55, 60, 67],
				},
				{
					frets: [-1, 3, 0, 0, 3, 3],
					fingers: [0, 1, 0, 0, 2, 3],
					baseFret: 1,
					barres: [],
					midi: [48, 50, 55, 62, 67],
				},
				{
					frets: [1, 1, 3, 3, 1, 1],
					fingers: [1, 1, 3, 4, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [43, 48, 55, 60, 62, 67],
				},
				{
					frets: [2, -1, 0, 1, 2, 2],
					fingers: [2, 0, 0, 1, 3, 4],
					baseFret: 7,
					barres: [],
					midi: [48, 50, 62, 67, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: 'sus4',
			positions: [
				{
					frets: [-1, 3, 3, 0, 1, 1],
					fingers: [0, 3, 4, 0, 1, 1],
					barres: [1],
					baseFret: 1,
					midi: [48, 53, 55, 60, 65],
				},
				{
					frets: [1, 1, 3, 3, 4, 1],
					fingers: [1, 1, 2, 3, 4, 1],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [43, 48, 55, 60, 65, 67],
				},
				{
					frets: [3, 3, -1, 0, 1, 3],
					fingers: [2, 3, 0, 0, 1, 4],
					baseFret: 6,
					barres: [],
					midi: [48, 53, 55, 65, 72],
				},
				{
					frets: [1, 3, 3, 3, 1, 1],
					fingers: [1, 2, 3, 4, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 55, 60, 65, 67, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: '7b5',
			positions: [
				{
					frets: [-1, -1, 2, 3, 1, 2],
					fingers: [0, 0, 2, 4, 1, 3],
					baseFret: 1,
					barres: [],
					midi: [52, 58, 60, 66],
				},
				{
					frets: [-1, 1, 2, 1, 3, -1],
					fingers: [0, 1, 2, 1, 3, 0],
					barres: [1],
					baseFret: 3,
					midi: [48, 54, 58, 64],
				},
				{
					frets: [2, -1, 2, 3, 1, 0],
					fingers: [2, 0, 3, 4, 1, 0],
					baseFret: 7,
					barres: [],
					midi: [48, 58, 64, 66, 64],
				},
				{
					frets: [-1, -1, 1, 2, 2, 3],
					fingers: [0, 0, 1, 2, 3, 4],
					baseFret: 10,
					barres: [],
					midi: [60, 66, 70, 76],
				},
			],
		},
		{
			key: 'C',
			suffix: '7/G',
			positions: [
				{
					frets: [3, 3, 2, 3, -1, -1],
					fingers: [2, 3, 1, 4, 0, 0],
					baseFret: 1,
					barres: [],
					midi: [43, 48, 52, 58],
				},
				{
					frets: [3, 1, 2, 0, 1, 0],
					fingers: [4, 2, 3, 0, 1, 0],
					baseFret: 1,
					barres: [],
					midi: [43, 46, 52, 55, 60, 64],
				},
				{
					frets: [1, 1, 3, 1, 3, 1],
					fingers: [1, 1, 3, 1, 4, 1],
					barres: [1],
					baseFret: 3,
					midi: [43, 48, 55, 58, 64, 67],
				},
			],
		},
		{
			key: 'C',
			suffix: 'aug7',
			positions: [
				{
					frets: [-1, 3, 2, 3, -1, 4],
					fingers: [0, 2, 1, 3, 0, 4],
					baseFret: 1,
					barres: [],
					midi: [48, 52, 58, 68],
				},
				{
					frets: [-1, 1, 4, 1, 3, 2],
					fingers: [0, 1, 4, 1, 3, 2],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [48, 56, 58, 64, 68],
				},
				{
					frets: [1, -1, 1, 2, 2, 0],
					fingers: [1, 0, 2, 3, 4, 0],
					baseFret: 8,
					barres: [],
					midi: [48, 58, 64, 68, 64],
				},
				{
					frets: [-1, -1, 1, 4, 2, 3],
					fingers: [0, 0, 1, 4, 2, 3],
					baseFret: 10,
					barres: [],
					midi: [60, 68, 70, 76],
				},
			],
		},
		{
			key: 'C',
			suffix: '9',
			positions: [
				{
					frets: [0, 3, 2, 0, 3, 0],
					fingers: [0, 2, 3, 0, 4, 0],
					baseFret: 1,
					barres: [],
					midi: [40, 48, 52, 55, 62, 64],
				},
				{
					frets: [3, 3, 2, 3, 3, 3],
					fingers: [2, 2, 1, 3, 3, 4],
					barres: [3],
					baseFret: 1,
					midi: [43, 48, 52, 58, 62, 67],
				},
				{
					frets: [2, 1, 2, 1, 2, 2],
					fingers: [2, 1, 3, 1, 4, 4],
					barres: [1],
					capo: true,
					baseFret: 7,
					midi: [48, 52, 58, 62, 67, 72],
				},
				{
					frets: [2, 4, 2, 1, 2, 4],
					fingers: [1, 3, 1, 2, 1, 4],
					barres: [2],
					capo: true,
					baseFret: 7,
					midi: [48, 55, 58, 62, 67, 74],
				},
				{
					frets: [-1, -1, 2, 1, 3, 2],
					fingers: [0, 0, 2, 1, 4, 3],
					baseFret: 9,
					barres: [],
					midi: [60, 64, 70, 74],
				},
			],
		},
		{
			key: 'C',
			suffix: '9b5',
			positions: [
				{
					frets: [-1, 3, 2, 3, 3, 2],
					fingers: [0, 2, 1, 3, 4, 1],
					barres: [2],
					capo: true,
					baseFret: 1,
					midi: [48, 52, 58, 62, 66],
				},
				{
					frets: [-1, 3, 4, 3, 3, 0],
					fingers: [0, 1, 4, 2, 3, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 54, 58, 62, 64],
				},
				{
					frets: [2, 1, 2, 1, 1, 2],
					fingers: [2, 1, 3, 1, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 7,
					midi: [48, 52, 58, 62, 66, 72],
				},
				{
					frets: [1, 2, 1, 2, -1, 3],
					fingers: [1, 2, 1, 3, 0, 4],
					barres: [1],
					baseFret: 8,
					midi: [48, 54, 58, 64, 74],
				},
			],
		},
		{
			key: 'C',
			suffix: 'aug9',
			positions: [
				{
					frets: [-1, 3, 2, 3, 3, 4],
					fingers: [0, 2, 1, 3, 3, 4],
					barres: [3],
					baseFret: 1,
					midi: [48, 52, 58, 62, 68],
				},
				{
					frets: [-1, 1, 0, 1, 3, 2],
					fingers: [0, 1, 0, 2, 4, 3],
					baseFret: 3,
					barres: [],
					midi: [48, 50, 58, 64, 68],
				},
				{
					frets: [2, 1, 2, 1, 1, 2],
					fingers: [2, 1, 3, 1, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 5,
					midi: [46, 50, 56, 60, 64, 70],
				},
				{
					frets: [2, 1, 2, 1, 3, -1],
					fingers: [2, 1, 3, 1, 4, 0],
					barres: [1],
					capo: true,
					baseFret: 7,
					midi: [48, 52, 58, 62, 68],
				},
			],
		},
		{
			key: 'C',
			suffix: '7b9',
			positions: [
				{
					frets: [-1, 3, 2, 3, 2, 3],
					fingers: [0, 2, 1, 3, 1, 4],
					barres: [2],
					capo: true,
					baseFret: 1,
					midi: [48, 52, 58, 61, 67],
				},
				{
					frets: [3, 2, 3, 1, -1, -1],
					fingers: [3, 2, 4, 1, 0, 0],
					baseFret: 6,
					barres: [],
					midi: [48, 52, 58, 61],
				},
				{
					frets: [1, -1, 1, 2, 1, 2],
					fingers: [1, 0, 1, 2, 1, 3],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 58, 64, 67, 73],
				},
				{
					frets: [-1, -1, 2, 1, 3, 1],
					fingers: [0, 0, 3, 1, 4, 2],
					baseFret: 9,
					barres: [],
					midi: [60, 64, 70, 73],
				},
			],
		},
		{
			key: 'C',
			suffix: '7#9',
			positions: [
				{
					frets: [-1, 3, 2, 3, 4, -1],
					fingers: [0, 2, 1, 3, 4, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 52, 58, 63],
				},
				{
					frets: [-1, 1, 3, 1, 2, 0],
					fingers: [0, 1, 3, 1, 2, 0],
					barres: [1],
					baseFret: 3,
					midi: [48, 55, 58, 63, 64],
				},
				{
					frets: [1, 3, 1, 2, 1, 4],
					fingers: [1, 3, 1, 2, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 55, 58, 64, 67, 75],
				},
				{
					frets: [-1, -1, 2, 1, 3, 3],
					fingers: [0, 0, 2, 1, 3, 4],
					baseFret: 9,
					barres: [],
					midi: [60, 64, 70, 75],
				},
			],
		},
		{
			key: 'C',
			suffix: '11',
			positions: [
				{
					frets: [-1, 3, 2, 3, 1, 1],
					fingers: [0, 3, 2, 4, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 1,
					midi: [48, 52, 58, 60, 65],
				},
				{
					frets: [-1, 1, 1, 1, 3, 1],
					fingers: [0, 1, 1, 1, 3, 1],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [48, 53, 58, 64, 67],
				},
				{
					frets: [3, 2, 0, 0, 1, 1],
					fingers: [3, 2, 0, 0, 1, 1],
					barres: [1],
					baseFret: 6,
					midi: [48, 52, 50, 55, 65, 70],
				},
				{
					frets: [1, 1, 1, 2, 1, 1],
					fingers: [1, 1, 1, 2, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 53, 58, 64, 67, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: '9#11',
			positions: [
				{
					frets: [-1, 3, 2, 3, 3, 2],
					fingers: [0, 2, 1, 3, 4, 1],
					barres: [2],
					capo: true,
					baseFret: 1,
					midi: [48, 52, 58, 62, 66],
				},
				{
					frets: [-1, 1, 2, 1, 3, 1],
					fingers: [0, 1, 2, 1, 3, 1],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [48, 54, 58, 64, 67],
				},
				{
					frets: [2, 1, 2, 1, 1, 2],
					fingers: [2, 1, 3, 1, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 7,
					midi: [48, 52, 58, 62, 66, 72],
				},
				{
					frets: [-1, -1, 1, 2, 2, 3],
					fingers: [0, 0, 1, 2, 3, 4],
					baseFret: 10,
					barres: [],
					midi: [60, 66, 70, 76],
				},
			],
		},
		{
			key: 'C',
			suffix: '13',
			positions: [
				{
					frets: [-1, 2, 1, 2, 4, 4],
					fingers: [0, 2, 1, 3, 4, 4],
					barres: [4],
					baseFret: 2,
					midi: [48, 52, 58, 64, 69],
				},
				{
					frets: [1, 1, 1, 1, 3, 3],
					fingers: [1, 1, 1, 1, 3, 4],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [43, 48, 53, 58, 64, 69],
				},
				{
					frets: [3, 2, 2, 2, 3, 1],
					fingers: [3, 2, 2, 2, 4, 1],
					barres: [2],
					baseFret: 6,
					midi: [48, 52, 57, 62, 67, 70],
				},
				{
					frets: [1, 3, 1, 2, 3, 1],
					fingers: [1, 3, 1, 2, 4, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 55, 58, 64, 69, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: 'maj7',
			positions: [
				{
					frets: [3, 3, 2, 0, 0, 0],
					fingers: [2, 3, 1, 0, 0, 0],
					baseFret: 1,
					barres: [],
					midi: [43, 48, 52, 55, 59, 64],
				},
				{
					frets: [1, 1, 3, 2, 3, 1],
					fingers: [1, 1, 3, 2, 4, 1],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [43, 48, 55, 59, 64, 67],
				},
				{
					frets: [-1, -1, 1, 1, 1, 3],
					fingers: [0, 0, 1, 1, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 5,
					midi: [55, 60, 64, 71],
				},
				{
					frets: [-1, -1, 1, 3, 3, 3],
					fingers: [0, 0, 1, 3, 3, 3],
					barres: [3],
					baseFret: 10,
					midi: [60, 67, 71, 76],
				},
			],
		},
		{
			key: 'C',
			suffix: 'maj7b5',
			positions: [
				{
					frets: [-1, 3, 2, 4, 0, 2],
					fingers: [0, 3, 1, 4, 0, 2],
					baseFret: 1,
					barres: [],
					midi: [48, 52, 59, 59, 66],
				},
				{
					frets: [-1, 1, 2, 2, 3, -1],
					fingers: [0, 1, 2, 3, 4, 0],
					baseFret: 3,
					barres: [],
					midi: [48, 54, 59, 64],
				},
				{
					frets: [2, 1, 3, 3, 1, 1],
					fingers: [2, 1, 3, 4, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 7,
					midi: [48, 52, 59, 64, 66, 71],
				},
				{
					frets: [-1, -1, 1, 2, 3, 3],
					fingers: [0, 0, 1, 2, 3, 4],
					baseFret: 10,
					barres: [],
					midi: [60, 66, 71, 76],
				},
			],
		},
		{
			key: 'C',
			suffix: 'maj7#5',
			positions: [
				{
					frets: [-1, 3, 2, 1, 0, 0],
					fingers: [0, 3, 2, 1, 0, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 52, 56, 59, 64],
				},
				{
					frets: [-1, 1, 4, 2, 3, 0],
					fingers: [0, 1, 4, 2, 3, 0],
					baseFret: 3,
					barres: [],
					midi: [48, 56, 59, 64, 64],
				},
				{
					frets: [4, 3, 2, 1, 0, 0],
					fingers: [4, 3, 2, 1, 0, 0],
					baseFret: 5,
					barres: [],
					midi: [48, 52, 56, 60, 59, 64],
				},
				{
					frets: [1, 4, 3, 2, 0, 0],
					fingers: [1, 4, 3, 2, 0, 0],
					baseFret: 8,
					barres: [],
					midi: [48, 56, 60, 64, 59, 64],
				},
			],
		},
		{
			key: 'C',
			suffix: 'maj9',
			positions: [
				{
					frets: [-1, 3, 0, 0, 0, 0],
					fingers: [0, 3, 0, 0, 0, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 50, 55, 59, 64],
				},
				{
					frets: [3, 3, 2, 4, 3, -1],
					fingers: [2, 2, 1, 4, 3, 0],
					barres: [3],
					baseFret: 1,
					midi: [43, 48, 52, 59, 62],
				},
				{
					frets: [0, 1, 1, 1, 1, 3],
					fingers: [0, 1, 1, 1, 1, 3],
					barres: [1],
					capo: true,
					baseFret: 5,
					midi: [40, 50, 55, 60, 64, 71],
				},
				{
					frets: [1, -1, 2, 2, 1, 3],
					fingers: [1, 0, 2, 3, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 59, 64, 67, 74],
				},
			],
		},
		{
			key: 'C',
			suffix: 'maj11',
			positions: [
				{
					frets: [-1, 3, 2, 0, 0, 1],
					fingers: [0, 3, 2, 0, 0, 1],
					baseFret: 1,
					barres: [],
					midi: [48, 52, 55, 59, 65],
				},
				{
					frets: [-1, 3, 3, 0, 0, 0],
					fingers: [0, 1, 1, 0, 0, 0],
					barres: [3],
					baseFret: 1,
					midi: [48, 53, 55, 59, 64],
				},
				{
					frets: [3, 2, 4, 0, 1, 0],
					fingers: [3, 2, 4, 0, 1, 0],
					baseFret: 6,
					barres: [],
					midi: [48, 52, 59, 55, 65, 64],
				},
				{
					frets: [1, 1, 2, 2, 1, 1],
					fingers: [1, 1, 2, 3, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 53, 59, 64, 67, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: 'maj13',
			positions: [
				{
					frets: [-1, 3, 2, 2, 0, 1],
					fingers: [0, 4, 2, 3, 0, 1],
					baseFret: 1,
					barres: [],
					midi: [48, 52, 57, 59, 65],
				},
				{
					frets: [-1, 1, 1, 2, 3, 3],
					fingers: [0, 1, 1, 2, 3, 4],
					barres: [1],
					baseFret: 3,
					midi: [48, 53, 59, 64, 69],
				},
				{
					frets: [2, 1, 1, 1, 2, 1],
					fingers: [2, 1, 1, 1, 3, 1],
					barres: [1],
					capo: true,
					baseFret: 7,
					midi: [48, 52, 57, 62, 67, 71],
				},
				{
					frets: [1, 1, 2, 2, 3, 1],
					fingers: [1, 1, 2, 3, 4, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 53, 59, 64, 69, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: 'm6',
			positions: [
				{
					frets: [-1, 3, 1, 2, 1, 3],
					fingers: [0, 3, 1, 2, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 1,
					midi: [48, 51, 57, 60, 67],
				},
				{
					frets: [-1, 1, 3, -1, 2, 3],
					fingers: [0, 1, 3, 0, 2, 4],
					baseFret: 3,
					barres: [],
					midi: [48, 55, 63, 69],
				},
				{
					frets: [2, -1, 1, 2, 2, 2],
					fingers: [2, 0, 1, 3, 3, 4],
					barres: [2],
					baseFret: 7,
					midi: [48, 57, 63, 67, 72],
				},
				{
					frets: [1, 3, 3, 1, 3, 1],
					fingers: [1, 2, 3, 1, 4, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 55, 60, 63, 69, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: 'm7',
			positions: [
				{
					frets: [-1, 3, 1, 3, 4, -1],
					fingers: [0, 2, 1, 3, 4, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 51, 58, 63],
				},
				{
					frets: [1, 1, 3, 1, 2, 1],
					fingers: [1, 1, 3, 1, 2, 1],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [43, 48, 55, 58, 63, 67],
				},
				{
					frets: [-1, -1, 2, 2, 1, 3],
					fingers: [0, 0, 2, 3, 1, 4],
					baseFret: 4,
					barres: [],
					midi: [55, 60, 63, 70],
				},
				{
					frets: [1, 3, 1, 1, 1, 1],
					fingers: [1, 3, 1, 1, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 55, 58, 63, 67, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: 'm7b5',
			positions: [
				{
					frets: [-1, 3, 4, 3, 4, -1],
					fingers: [0, 1, 3, 2, 4, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 54, 58, 63],
				},
				{
					frets: [-1, -1, 1, 2, 1, 3],
					fingers: [0, 0, 1, 2, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 4,
					midi: [54, 60, 63, 70],
				},
				{
					frets: [1, 2, 3, 1, 4, 1],
					fingers: [1, 2, 3, 1, 4, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 54, 60, 63, 70, 72],
				},
				{
					frets: [-1, -1, 1, 2, 2, 2],
					fingers: [0, 0, 1, 3, 3, 3],
					barres: [2],
					baseFret: 10,
					midi: [60, 66, 70, 75],
				},
			],
		},
		{
			key: 'C',
			suffix: 'm9',
			positions: [
				{
					frets: [-1, 3, 1, 3, 3, 3],
					fingers: [0, 2, 1, 3, 4, 4],
					barres: [3],
					baseFret: 1,
					midi: [48, 51, 58, 62, 67],
				},
				{
					frets: [-1, 3, 0, 3, 4, 3],
					fingers: [0, 1, 0, 2, 4, 3],
					baseFret: 1,
					barres: [],
					midi: [48, 50, 58, 63, 67],
				},
				{
					frets: [-1, 1, 3, 2, 3, 3],
					fingers: [0, 1, 3, 2, 4, 4],
					barres: [3],
					baseFret: 6,
					midi: [51, 58, 62, 67, 72],
				},
				{
					frets: [1, 3, 1, 1, 1, 3],
					fingers: [1, 3, 1, 1, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 55, 58, 63, 67, 74],
				},
			],
		},
		{
			key: 'C',
			suffix: 'm69',
			positions: [
				{
					frets: [-1, 3, 1, 2, 3, 3],
					fingers: [0, 3, 1, 2, 4, 4],
					barres: [3],
					baseFret: 1,
					midi: [48, 51, 57, 62, 67],
				},
				{
					frets: [-1, 1, 0, 0, 2, 3],
					fingers: [0, 1, 0, 0, 2, 4],
					baseFret: 3,
					barres: [],
					midi: [48, 50, 55, 63, 69],
				},
				{
					frets: [3, 1, 2, 2, -1, -1],
					fingers: [4, 1, 2, 3, 0, 0],
					baseFret: 6,
					barres: [],
					midi: [48, 51, 57, 62],
				},
				{
					frets: [-1, 3, 3, 1, 3, 3],
					fingers: [0, 2, 2, 1, 3, 4],
					barres: [3],
					baseFret: 8,
					midi: [55, 60, 63, 69, 74],
				},
			],
		},
		{
			key: 'C',
			suffix: 'm11',
			positions: [
				{
					frets: [-1, 3, 1, 3, 3, 1],
					fingers: [0, 2, 1, 3, 4, 1],
					barres: [1],
					capo: true,
					baseFret: 1,
					midi: [48, 51, 58, 62, 65],
				},
				{
					frets: [-1, 3, 3, 3, 4, 3],
					fingers: [0, 1, 1, 1, 2, 1],
					barres: [3],
					capo: true,
					baseFret: 1,
					midi: [48, 53, 58, 63, 67],
				},
				{
					frets: [3, 1, 3, 2, 1, 1],
					fingers: [3, 1, 4, 2, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 6,
					midi: [48, 51, 58, 62, 65, 70],
				},
				{
					frets: [1, 1, 1, 1, 1, 3],
					fingers: [1, 1, 1, 1, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 53, 58, 63, 67, 74],
				},
			],
		},
		{
			key: 'C',
			suffix: 'mmaj7',
			positions: [
				{
					frets: [-1, 3, 1, 0, 0, -1],
					fingers: [0, 3, 1, 0, 0, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 51, 55, 59],
				},
				{
					frets: [1, 1, 3, 2, 2, 1],
					fingers: [1, 1, 4, 2, 3, 1],
					barres: [1],
					capo: true,
					baseFret: 3,
					midi: [43, 48, 55, 59, 63, 67],
				},
				{
					frets: [1, 3, 2, 1, 1, 1],
					fingers: [1, 3, 2, 1, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 55, 59, 63, 67, 72],
				},
				{
					frets: [-1, -1, 1, 3, 3, 2],
					fingers: [0, 0, 1, 3, 4, 2],
					baseFret: 10,
					barres: [],
					midi: [60, 67, 71, 75],
				},
			],
		},
		{
			key: 'C',
			suffix: 'mmaj7b5',
			positions: [
				{
					frets: [-1, 3, -1, 4, 4, 2],
					fingers: [0, 2, 0, 3, 4, 1],
					baseFret: 1,
					barres: [],
					midi: [48, 59, 63, 66],
				},
				{
					frets: [-1, 3, 4, 4, 4, -1],
					fingers: [0, 1, 2, 3, 4, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 54, 59, 63],
				},
				{
					frets: [1, 2, 2, 1, -1, 1],
					fingers: [1, 2, 3, 1, 0, 1],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 54, 59, 63, 72],
				},
				{
					frets: [-1, -1, 1, 2, 3, 2],
					fingers: [0, 0, 1, 2, 4, 3],
					baseFret: 10,
					barres: [],
					midi: [60, 66, 71, 75],
				},
			],
		},
		{
			key: 'C',
			suffix: 'mmaj9',
			positions: [
				{
					frets: [-1, 3, 1, 4, 3, -1],
					fingers: [0, 2, 1, 4, 3, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 51, 59, 62],
				},
				{
					frets: [-1, 3, 0, 4, 4, 3],
					fingers: [0, 1, 0, 3, 4, 2],
					baseFret: 1,
					barres: [],
					midi: [48, 50, 59, 63, 67],
				},
				{
					frets: [3, 1, -1, 2, 0, 3],
					fingers: [3, 1, 0, 2, 0, 4],
					baseFret: 6,
					barres: [],
					midi: [48, 51, 62, 59, 72],
				},
				{
					frets: [1, 3, 2, 1, 1, 3],
					fingers: [1, 3, 2, 1, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 55, 59, 63, 67, 74],
				},
			],
		},
		{
			key: 'C',
			suffix: 'mmaj11',
			positions: [
				{
					frets: [-1, 3, 1, 0, 0, 1],
					fingers: [0, 3, 1, 0, 0, 2],
					baseFret: 1,
					barres: [],
					midi: [48, 51, 55, 59, 65],
				},
				{
					frets: [3, 3, 3, 4, 4, 3],
					fingers: [1, 1, 1, 2, 3, 1],
					barres: [3],
					capo: true,
					baseFret: 1,
					midi: [43, 48, 53, 59, 63, 67],
				},
				{
					frets: [1, 1, 2, 1, 1, 3],
					fingers: [1, 1, 2, 1, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [48, 53, 59, 63, 67, 74],
				},
				{
					frets: [-1, -1, 1, 1, 3, 2],
					fingers: [0, 0, 1, 1, 3, 2],
					barres: [1],
					capo: true,
					baseFret: 10,
					midi: [60, 65, 71, 75],
				},
			],
		},
		{
			key: 'C',
			suffix: 'add9',
			positions: [
				{
					frets: [-1, 3, 2, 0, 3, 0],
					fingers: [0, 2, 1, 0, 3, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 52, 55, 62, 64],
				},
				{
					frets: [-1, 3, 0, 0, 3, 0],
					fingers: [0, 1, 0, 0, 3, 0],
					baseFret: 1,
					barres: [],
					midi: [48, 50, 55, 62, 64],
				},
				{
					frets: [2, 1, 0, 0, 2, 0],
					fingers: [2, 1, 0, 0, 3, 0],
					baseFret: 7,
					barres: [],
					midi: [48, 52, 50, 55, 67, 64],
				},
				{
					frets: [-1, -1, 3, 2, 1, 3],
					fingers: [0, 0, 3, 2, 1, 4],
					baseFret: 8,
					barres: [],
					midi: [60, 64, 67, 74],
				},
			],
		},
		{
			key: 'C',
			suffix: 'madd9',
			positions: [
				{
					frets: [-1, 3, 1, 0, 3, 3],
					fingers: [0, 2, 1, 0, 3, 4],
					baseFret: 1,
					barres: [],
					midi: [48, 51, 55, 62, 67],
				},
				{
					frets: [-1, 1, 0, 3, 2, 1],
					fingers: [0, 1, 0, 4, 3, 2],
					baseFret: 3,
					barres: [],
					midi: [48, 50, 60, 63, 67],
				},
				{
					frets: [3, 1, 0, 2, 3, 3],
					fingers: [3, 1, 0, 2, 4, 4],
					barres: [3],
					baseFret: 6,
					midi: [48, 51, 50, 62, 67, 72],
				},
				{
					frets: [-1, -1, 3, 1, 1, 3],
					fingers: [0, 0, 3, 1, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 8,
					midi: [60, 63, 67, 74],
				},
			],
		},
		{
			key: 'C',
			suffix: '/E',
			positions: [
				{
					frets: [0, 3, 2, 0, 1, 0],
					fingers: [0, 3, 2, 0, 1, 0],
					baseFret: 1,
					barres: [],
					midi: [40, 48, 52, 55, 60, 64],
				},
				{
					frets: [0, 3, 2, 0, 1, 3],
					fingers: [0, 3, 2, 0, 1, 4],
					baseFret: 1,
					barres: [],
					midi: [40, 48, 52, 55, 60, 67],
				},
				{
					frets: [-1, 3, 1, 1, 4, 4],
					fingers: [0, 3, 1, 1, 4, 4],
					barres: [1],
					baseFret: 5,
					midi: [52, 55, 60, 67, 72],
				},
			],
		},
		{
			key: 'C',
			suffix: '/F',
			positions: [
				{
					frets: [-1, -1, 3, 0, 1, 0],
					fingers: [0, 0, 3, 0, 1, 0],
					baseFret: 1,
					barres: [],
					midi: [53, 55, 60, 64],
				},
				{
					frets: [1, 3, 2, 0, 1, 0],
					fingers: [1, 4, 3, 0, 2, 0],
					baseFret: 1,
					barres: [],
					midi: [41, 48, 52, 55, 60, 64],
				},
				{
					frets: [-1, -1, 1, 3, 3, 1],
					fingers: [0, 0, 1, 3, 4, 2],
					baseFret: 3,
					barres: [],
					midi: [53, 60, 64, 67],
				},
			],
		},
		{
			key: 'C',
			suffix: '/G',
			positions: [
				{
					frets: [3, 3, 2, 0, 1, 0],
					fingers: [3, 4, 2, 0, 1, 0],
					baseFret: 1,
					barres: [],
					midi: [43, 48, 52, 55, 60, 64],
				},
				{
					frets: [1, 1, 3, 3, 3, 1],
					fingers: [1, 1, 2, 3, 4, 1],
					barres: [1],
					baseFret: 3,
					midi: [43, 48, 55, 60, 64, 67],
				},
				{
					frets: [2, 2, 1, 4, 4, -1],
					fingers: [2, 3, 1, 4, 4, 0],
					barres: [4],
					baseFret: 2,
					midi: [43, 48, 52, 60, 64],
				},
			],
		},
	],
	Csharp: [
		{
			key: 'C#',
			suffix: 'major',
			positions: [
				{
					frets: [-1, 4, 3, 1, 2, 1],
					fingers: [0, 4, 3, 1, 2, 1],
					barres: [1],
					baseFret: 1,
					midi: [49, 53, 56, 61, 65],
				},
				{
					frets: [1, 1, 3, 3, 3, 1],
					fingers: [1, 1, 2, 3, 4, 1],
					barres: [1],
					capo: true,
					baseFret: 4,
					midi: [44, 49, 56, 61, 65, 68],
				},
				{
					frets: [4, 3, 1, 1, 1, 4],
					fingers: [3, 2, 1, 1, 1, 4],
					barres: [1],
					baseFret: 6,
					midi: [49, 53, 56, 61, 65, 73],
				},
				{
					frets: [1, 3, 3, 2, 1, 1],
					fingers: [1, 3, 4, 2, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 9,
					midi: [49, 56, 61, 65, 68, 73],
				},
			],
		},
		{
			key: 'C#',
			suffix: 'minor',
			positions: [
				{
					frets: [-1, 4, 2, 1, 2, -1],
					fingers: [0, 4, 2, 1, 3, 0],
					baseFret: 1,
					barres: [],
					midi: [49, 52, 56, 61],
				},
				{
					frets: [1, 1, 3, 3, 2, 1],
					fingers: [1, 1, 3, 4, 2, 1],
					barres: [1],
					capo: true,
					baseFret: 4,
					midi: [44, 49, 56, 61, 64, 68],
				},
				{
					frets: [4, 2, 1, 1, -1, 4],
					fingers: [3, 2, 1, 1, 0, 4],
					barres: [1],
					baseFret: 6,
					midi: [49, 52, 56, 61, 73],
				},
				{
					frets: [1, 3, 3, 1, 1, 1],
					fingers: [1, 3, 4, 1, 1, 1],
					barres: [1],
					capo: true,
					baseFret: 9,
					midi: [49, 56, 61, 64, 68, 73],
				},
			],
		},
		{
			key: 'C#',
			suffix: 'madd9',
			positions: [
				{
					frets: [-1, 4, 2, 1, 4, -1],
					fingers: [0, 3, 2, 1, 4, 0],
					baseFret: 1,
					barres: [],
					midi: [49, 52, 56, 63],
				},
				{
					frets: [-1, 1, 3, 3, 1, 0],
					fingers: [0, 1, 3, 4, 2, 0],
					baseFret: 4,
					barres: [],
					midi: [49, 56, 61, 63, 64],
				},
				{
					frets: [3, 1, -1, 2, 3, 0],
					fingers: [3, 1, 0, 2, 4, 0],
					baseFret: 7,
					barres: [],
					midi: [49, 52, 63, 68, 64],
				},
				{
					frets: [-1, -1, 3, 1, 1, 3],
					fingers: [0, 0, 3, 1, 1, 4],
					barres: [1],
					capo: true,
					baseFret: 9,
					midi: [61, 64, 68, 75],
				},
			],
		},
	],
};
const flattenedChords = flattenChords(chords);
console.log(flattenedChords);

const Demo = () => {
	// const [audioContext, setAudioContext] = useState(null);
	const [instrumentName, setInstrumentName] = useState('acoustic_guitar_steel');
	const [player, setPlayer] = useState(null);

	const audioCtx = useRef(null);

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

		createAudioContext();

		return () => {
			if (audioCtx.current) {
				audioCtx.current.close();
			}
		};
	}, [instrumentName]);

	const playNote = async (note, time) => {
		return new Promise((resolve) => {
			setTimeout(async () => {
				if (player && audioCtx.current) {
					await player.play(note, audioCtx.current.currentTime);
					resolve();
				}
			}, time);
		});
	};

	const playChord = async (chord) => {
		// if (player && audioCtx.current) {
		// 	const currentTime = audioCtx.current.currentTime;
		// 	const promises = chord.map((note) => player.play(note, currentTime));
		// 	await Promise.all(promises);
		// }

		// Strum sequence
		if (player && audioCtx.current) {
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
		<div>
			{/* <button onClick={() => playNote('C4')}>Play C4</button>
			<button onClick={() => playNote('D4')}>Play D4</button>
			<button onClick={() => playNote('E4')}>Play E4</button> */}

			<button onClick={() => playChord(['C3', 'E3', 'G3', 'C4', 'E4'])}>Play C</button>
			<button onClick={() => playChord(['G2', 'B2', 'D3', 'G3', 'B3', 'G4'])}>Play G</button>
			<button onClick={() => playChord(['A2', 'B2', 'A3', 'C4', 'E4'])}>Play Am</button>
			<button onClick={() => playChord(['E2', 'B2', 'E3', 'G3', 'B3', 'E4'])}>Play Em</button>
			<button onClick={() => playChord(['F2', 'C3', 'F3', 'A3', 'C3', 'F4'])}>Play F</button>
			<button onClick={() => playChord(['D3', 'A3', 'D4', 'F4'])}>Play Dm</button>
		</div>
	);
};

export default Demo;
