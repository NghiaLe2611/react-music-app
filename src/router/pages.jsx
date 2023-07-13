import Loadable from 'components/Loadable';
import { lazy } from 'react';

const HomePage = Loadable(lazy(() => import('view/home')));
const ChordPage = Loadable(lazy(() => import('view/chords')));

export { HomePage, ChordPage };