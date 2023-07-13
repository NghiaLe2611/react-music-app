import 'assets/tailwind.css';
import ChordProvider from 'context/ChordContext';
import {Route, Routes} from 'react-router-dom';
import {routes} from 'router';

function App() {
	// const uiState = useSelector((state) => state.ui);
	// const dispatch = useDispatch();

	// const handleToggle = () => {
	// 	dispatch(uiACtions.toggleTheme());
	// };
	return (
		<ChordProvider>
			<div className='my-10'>
				<div className='container mx-auto'>
					<Routes>
						{routes.map((route, index) => (
							<Route key={index} path={route.path} element={route.element}>
								{route.children && (
									<Routes>
										{route.children.map((childRoute, childIndex) => (
											<Route key={childIndex} path={childRoute.path} element={childRoute.element} />
										))}
									</Routes>
								)}
							</Route>
						))}
					</Routes>
				</div>
			</div>
		</ChordProvider>
	);
}

export default App;
