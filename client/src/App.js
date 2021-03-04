import Home from './components/pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Router className='App'>
			<Switch>
				<Route path='/' component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
