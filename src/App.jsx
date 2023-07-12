import './App.css';
import 'assets/tailwind.css';
import Chords from 'components/Chords';
import { useDispatch, useSelector } from 'react-redux';
import { uiACtions } from 'store/slices/ui';

function App() {
	const uiState = useSelector((state) => state.ui);
	const dispatch = useDispatch();

	const handleToggle = () => {
		dispatch(uiACtions.toggleTheme());
	};

	return (
		<>
			<div>
				{/* <Chords chordName="Cmajor" /> */}
				<Chords chordName="Aminor" />
			</div>
			{/* <div onClick={handleToggle}>Toggle theme</div> */}
		</>
	);
}

export default App;