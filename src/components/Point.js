import React from 'react';

class Point extends React.Component {
	render() {
    const {coords, available, win} = this.props;
    const winModificator = !available ? (win ? ' board-point__win' : ' board-point__fail') : '';
		return (
      <li className={`board-point${winModificator}`}>
        <button disabled={!available} onClick={() => this.props.hitToScore(coords)}></button>
      </li>
		)
	}
}

Point.propTypes = {
  available: React.PropTypes.bool.isRequired,
  win: React.PropTypes.bool.isRequired,
  coords: React.PropTypes.array.isRequired,
  hitToScore: React.PropTypes.func.isRequired
};

export default Point;