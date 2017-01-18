import React from 'react';
import ShipBoard from './ShipBoard';
import ScoreBoard from './ScoreBoard';
import Point from './Point';
import sampleConfig from '../sample-config.js';

class Game extends React.Component {
	constructor() {
		super();

		this.hitToScore = this.hitToScore.bind(this);

		this.hitMax = sampleConfig.boardSize * sampleConfig.boardSize / 2;
		this.scoreMax = 0;
		sampleConfig.layout.map((ship) => this.scoreMax += ship.positions.length);

		// initial State
		this.state = {
			points: {},
			shipHit: {},
			hitCount: 0,
			score: 0
		}
	}

	getScore(points) {
		let score = 0;
		Object.keys(points).map((pointkey) => (points[pointkey].win ? score++ : 0));
		return score;
	}

	getHitCount(points) {
		let hitCount = 0;
		Object.keys(points).map((pointkey) => (!points[pointkey].available ? hitCount++ : 0));
		return hitCount;
	}

	componentWillMount() {
		// check if there is any points in localStorage
		const localStoragePointsRef = localStorage.getItem(`board-points`);
		let points = {};
		let shipHit = {};

		if (localStoragePointsRef) {
			points = JSON.parse(localStoragePointsRef);
		} else {
			for (var i = 0; i < sampleConfig.boardSize; i++) {
				for (var k = 0; k < sampleConfig.boardSize; k++) {
					points[this.getPointKey([i, k])] = {
						available: true,
						win: false,
						coords: [i, k]
					}
				}
			}
		}

		// check if there is any shiphit in localStorage
		const localStorageShipHitRef = localStorage.getItem(`board-shiphit`);
		if (localStorageShipHitRef) {
			shipHit = JSON.parse(localStorageShipHitRef) 
		} else {
			Object
				.keys(sampleConfig.shipTypes)
				.forEach((shipName) => {
					shipHit[shipName] = 0
				})
		}

		const score = this.getScore(points);
		const hitCount = this.getHitCount(points);

		this.setState({ 
			score,
			hitCount,
			points,
			shipHit
		});
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`board-points`, JSON.stringify(nextState.points))
		localStorage.setItem(`board-shiphit`, JSON.stringify(nextState.shipHit))
	}

	pointIsWin(coords) {
		let i = 0;
		for (const shipConfig of sampleConfig.layout) {
			for (i = 0; i < shipConfig.positions.length; i++) {
				if (
					shipConfig.positions[i][0] === coords[0] &&
					shipConfig.positions[i][1] === coords[1]
				) {
					const shipHit = this.state.shipHit;
					shipHit[shipConfig.ship] = shipHit[shipConfig.ship] ? shipHit[shipConfig.ship] + 1 : 1;
					this.setState({ shipHit });
					return true
				} 
			}
		}
		return false
	}

	hitToScore(coords) {
		const points = {...this.state.points};
		const point = {
			...points[this.getPointKey(coords)],
			available: false,
			win: this.pointIsWin(coords)
		}


		points[this.getPointKey(coords)] = point;

		const score = this.getScore(points);
		const hitCount = this.getHitCount(points);


		this.setState({ 
			score,
			hitCount,
			points 
		});

		if (this.hitMax - hitCount <= 0) {
			this.gotoFail();
		}

		if (score >= this.scoreMax) {
			this.gotoWin();
		}
	}

	removeFromOrder = (key) => {
		const order = {...this.state.order};
		delete order[key];
		this.setState({ order });
	}

	getPointKey = (coords) => `key${coords.join('')}`

	render() {
		return (
			<div className="game">
				<ul className="points-list">
					{
							Object
								.keys(this.state.points)
								.map((key, i) => {
										return <Point 
												key={key}
												coords={this.state.points[key].coords}
												win={this.state.points[key].win}
												available={this.state.points[key].available}
												hitToScore={this.hitToScore}
											/>
									}
								)
					}
				</ul>
				<div className="score-list">
					<ScoreBoard
						score={this.state.score}
						hitleft={this.hitMax - this.state.hitCount}
					/>
					<ShipBoard
						shipTypes={sampleConfig.shipTypes}
						shipHit={this.state.shipHit}
					/>
				</div>
			</div>
		)
	}

	gotoWin() {
		this.context.router.transitionTo('/win');
	}

	gotoFail() {
		this.context.router.transitionTo('/fail');
	}
}


Game.contextTypes = {
	router: React.PropTypes.object
};

export default Game;