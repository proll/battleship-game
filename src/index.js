import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss} from 'react-router';

import './css/style.css';
import Game from './components/Game';
import Win from './components/Win';
import Fail from './components/Fail';
import NotFound from './components/NotFound';

const Root = () => {
	return (
		<BrowserRouter>
			<div>			
				<Match exactly pattern="/" component={Game}/>
        <Match exactly pattern="/win" component={Win}/>
        <Match exactly pattern="/fail" component={Fail}/>
				<Miss component={NotFound}/>
			</div>
		</BrowserRouter>
	);
}


render(<Root/>, document.querySelector('#main'));
