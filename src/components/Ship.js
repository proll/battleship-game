import React from 'react';

class Ship extends React.Component {
	render() {
    const shipPoints = [];
    for (var i = 0; i < this.props.size; i++) {
      const shipPointModificator = (i < this.props.hit) ? 'ship-point_hit': '';
      shipPoints.push(
        <i key={i} className={`ship-point ${shipPointModificator}`}/>
      )
    }

    return (
      <li className="ship">
        <div className={`ship-image ship-image_${this.props.shipName}`}></div>
        {shipPoints}
      </li>
		)
	}
}

Ship.propTypes = {
  shipName: React.PropTypes.string.isRequired,
  size: React.PropTypes.number.isRequired,
  hit: React.PropTypes.number.isRequired
}

export default Ship;