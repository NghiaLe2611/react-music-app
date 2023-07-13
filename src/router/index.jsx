import { HomePage, ChordPage } from './pages';

export const routes = [
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/chords/:name',
		element: <ChordPage />,
	},
	{
		path: '*',
		element: (
			<div style={{ textAlign: 'center', padding: 20 }}>
				<h2>Page not found</h2>
			</div>
		),
	},
];